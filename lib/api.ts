import { BooruPost, BooruSite, SearchParams } from "./types";

const RANDOM_TAGS = [
  "big breasts",
  "sole female",
  "sole male",
  "group",
  "anal",
  "nakadashi",
  "lolicon",
  "stockings",
  "blowjob",
  "schoolgirl uniform",
  "full color",
  "glasses",
  "shotacon",
  "rape",
  "yaoi",
  "ahegao",
  "bondage",
  "males only",
  "incest",
  "milf",
  "x-ray",
  "dark skin",
  "paizuri",
  "double penetration",
  "sex toys",
  "futanari",
  "netorare",
  "defloration",
  "twintails",
  "yuri",
  "tentacles",
  "mind break",
  "vanilla",
  "bbw",
  "swimsuit",
  "maid",
  "bikini",
  "kemonomimi",
  "pregnancy",
  "impregnation",
  "harem",
  "virgin",
  "censored",
  "uncensored",
  "monster girl",
  "elf",
  "demon girl",
  "nun",
  "teacher",
  "office lady",
  "cheating",
  "blackmail",
  "mind control",
  "drugs",
  "public sex",
  "exhibitionism",
  "femdom",
  "pegging",
  "footjob",
  "handjob",
];

export const getRandomTag = () =>
  RANDOM_TAGS[Math.floor(Math.random() * RANDOM_TAGS.length)];

export async function fetchPosts(
  site: BooruSite,
  params: SearchParams
): Promise<BooruPost[]> {
  const { tags = "", limit = 20, page = 1 } = params;
  let url = "";

  switch (site) {
    case "danbooru":
      url = `https://danbooru.donmai.us/posts.json?tags=${encodeURIComponent(
        tags
      )}&limit=${limit}&page=${page}`;
      break;
    case "rule34":
      url = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(
        tags
      )}&limit=${limit}&pid=${
        page - 1
      }&api_key=66ae8301ea37de61745ffee2cd247d0da594b6647a05fb7f3289a99eb837eaa659eec05d08e9a1476f6421cdf53a264d4cadd4e8cdaedd816b086093268d49ca&user_id=5790310`;
      break;
    case "gelbooru":
      url = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(
        tags
      )}&limit=${limit}&pid=${
        page - 1
      }&api_key=0cec545ae7535e827a85845dba58a6b97039dd1b5ed1a8505f5c58d5d5a59ccb29f455baa0df908dbcc5186ac3ab014f93e52341f044b2e4b04d9f35d0af172f&user_id=1889509`;
      break;
  }

  try {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    let posts = data;
    if (site === "gelbooru") {
      posts = data.post || [];
    }

    if (!Array.isArray(posts)) {
      console.warn(`Expected array from ${site}, but got:`, data);
      return [];
    }

    return posts
      .map((post: any) => normalizePost(post, site))
      .filter((post) => post.file_url);
  } catch (error) {
    console.error(`Error fetching from ${site}:`, error);
    return [];
  }
}

function normalizePost(post: any, site: BooruSite): BooruPost {
  switch (site) {
    case "danbooru":
      return {
        id: post.id,
        // Use large_file_url for grid to avoid tiny thumbnails
        preview_url:
          post.large_file_url || post.file_url || post.preview_file_url,
        file_url: post.file_url || post.large_file_url,
        tags: post.tag_string ? post.tag_string.split(" ") : [],
        source: post.source,
        width: post.image_width,
        height: post.image_height,
        rating: post.rating,
        created_at: post.created_at,
        author: post.uploader_name,
        site,
      };
    case "rule34":
    case "gelbooru":
      return {
        id: post.id,
        // Use sample_url for grid to avoid tiny thumbnails
        preview_url: post.sample_url || post.file_url || post.preview_url,
        file_url: post.file_url || post.sample_url,
        tags: post.tags ? post.tags.trim().split(/\s+/) : [],
        source: post.source,
        width: parseInt(post.width),
        height: parseInt(post.height),
        rating: post.rating,
        created_at: post.created_at,
        author: post.owner || post.creator_id,
        site,
      };
    default:
      throw new Error(`Unsupported site: ${site}`);
  }
}

export async function fetchAllSites(
  params: SearchParams
): Promise<BooruPost[]> {
  const sites: BooruSite[] = ["danbooru", "rule34", "gelbooru"];
  const results = await Promise.all(
    sites.map((site) => fetchPosts(site, params))
  );
  return results.flat().sort(() => Math.random() - 0.5); // Shuffle results
}
