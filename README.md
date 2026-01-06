# Danbooru API Documentation

Danbooru provides a comprehensive REST-like API for accessing and managing anime/hentai image data. It supports CRUD operations on various resources like posts and tags.

### Base URL

- Main: `https://danbooru.donmai.us`
- Test: `https://testbooru.donmai.us` (for development)

### Supported Formats

- XML or JSON (specified via `.xml` or `.json` in the URL)

### Authentication

- Required for modifications: API key from user profile.
- Methods: Query params (`login` & `api_key`) or HTTP Basic Auth.

### Rate Limits

- Reads: 10 requests/second globally.
- Updates: 1-4/second based on user level.

### Key Endpoints

- **Posts**: `/posts.json` (GET for list/search, PATCH for update)
  - Parameters: `tags`, `page` (e.g., `b<id>` for before ID), `limit` (max 200)
  - Example: `https://danbooru.donmai.us/posts.json?tags=cat_girl&limit=10`
- **Tags**: `/tags.json` (GET for list)
- Other: Artists, pools, comments, etc.

### Examples

- Search posts: `GET /posts.json?tags=your_tags&page=2&limit=50`
- Update post: `PATCH /posts/123.json` with JSON body.

For full details, see [official docs](https://danbooru.donmai.us/wiki_pages/help:api).

# Hypnohub API Documentation

Hypnohub offers a basic API for hypnosis-themed hentai content, similar to Rule34 but minimal.

### Base URL

- `https://hypnohub.net/index.php?page=dapi`

### Supported Formats

- XML (default), JSON (add `&json=1`)

### Authentication

- None required.

### Rate Limits

- Not specified.

### Key Endpoints

- **Posts**: `&s=post&q=index`
  - Parameters: `limit` (max 1000), `pid` (page), `tags`, `id`
  - Deleted: Add `&deleted=show&last_id=`
- **Comments**: `&s=comment&q=index&post_id=`
- **Tags**: `&s=tag&q=index&limit=&id=`

### Examples

- Posts: `https://hypnohub.net/index.php?page=dapi&s=post&q=index&tags=hypnosis&limit=50&json=1`

# Yande.re API Documentation

Yande.re's API is mostly compatible with Danbooru v1.13.0, with some updates like JSON-only for certain endpoints.

### Base URL

- `https://yande.re`

### Supported Formats

- XML (`.xml`), JSON (`.json` for some), HTML (no extension)

### Authentication

- Required for modifications: `password_hash` (SHA1 of salted password).

### Rate Limits

- Enforced via status codes (e.g., 421 User Throttled); no explicit details.

### Key Endpoints

- **Posts**: `/post.xml` (GET list), `/post/create.xml` (POST create)
  - Parameters: `tags`, `limit` (max 100), `page`
- **Tags**: `/tag.xml` (GET list), `/tag/update.xml` (POST update)
- Differences from Danbooru: JSON for favorites (`/favorite/list_users.json`), no `/index` in URLs.

### Examples

- List: `GET /post.xml?tags=art&limit=5`

# Konachan API Documentation

Konachan's API mirrors Danbooru v1.13.0, focused on wallpaper-style anime/hentai.

### Base URL

- `https://konachan.com`

### Supported Formats

- XML (`.xml`), JSON (`.json` for some), HTML

### Authentication

- `password_hash` for modifications (SHA1 salted).

### Rate Limits

- Via 421 status; not detailed.

### Key Endpoints

- **Posts**: `/post.xml` (GET), `/post/create.xml` (POST)
  - Parameters: `tags`, `limit` (100 max), `page`
- **Tags**: `/tag.xml` (GET), `/tag/update.xml` (POST)
- Similar to Yande.re, with wiki, notes, pools, etc.

### Examples

- Search: `/post.xml?tags=wallpaper&limit=10`

# e621 API Documentation

e621's API supports furry/anime crossover content, with strong authentication and limits.

### Base URL

- `https://e621.net`

### Supported Formats

- JSON (`.json`)

### Authentication

- API key required; Basic Auth or query params.
- User-Agent header mandatory.

### Rate Limits

- 2 requests/second (hard); aim for 1/second.

### Key Endpoints

- **Posts**: `/posts.json` (GET list), `/uploads.json` (POST create)
  - Parameters: `tags`, `limit` (320 max), `page` (a/b<ID>)
- **Tags**: `/tags.json` (GET)
- Favorites, notes, pools with CRUD.

### Examples

- List: `GET /posts.json?tags=furry&limit=20`

# Rule34.paheal API Documentation

Rule34.paheal's API is less structured and emulates parts of Danbooru, but relies heavily on site queries and HTML parsing. Wrappers like booru handle it by scraping.

### Base URL

- `https://rule34.paheal.net`

### Supported Formats

- JSON for autocomplete, HTML for lists.

### Authentication

- Not required for basic access.

### Rate Limits

- Not documented.

### Key Endpoints

- **Autocomplete**: `/api/internal/autocomplete?s=keyword` (JSON)
- **Post List**: `/post/list/tag/page` (HTML; parse for images)
- No full REST; use tag searches like `/post/list/your_tags/1`

### Examples

- Autocomplete: `https://rule34.paheal.net/api/internal/autocomplete?s=cat`
- List: Parse HTML from `/post/list/cat_girl/1`

Note: For structured access, use npm wrappers as the native API is minimal.

# Realbooru API Documentation

Realbooru's API follows the standard booru DAPI format, similar to Gelbooru, for real-image hentai with anime tags.

### Base URL

- `https://realbooru.com/index.php?page=dapi&s=post&q=index`

### Supported Formats

- XML (default), JSON (add `&json=1`)

### Authentication

- API key from account for advanced access (optional for basics).

### Rate Limits

- Not specified.

### Key Endpoints

- **Posts**: Add `&tags=`, `&limit=`, `&pid=`
- Similar to Hypnohub: Comments and tags via `&s=comment` or `&s=tag`

### Examples

- Search: `https://realbooru.com/index.php?page=dapi&s=post&q=index&tags=real&limit=50&json=1`
  API Basics
  You should never receive an error unless the server is overloaded or the search dies. In cases of the searcher breaking, you will receive a response success of "false" and a message stating "search down" or similiar.

API Keys
URL to request API key: https://rule34.xxx/index.php?page=account&s=options

    user_id: Enter the ID of your user
    api_key: The API key

API limits may be changed at any time. If you run an application that requires higher limits, you can request an unlimited key. This is only applicable for large public project.
If it's a big Site/App that's more urgent make a ticket on our Discord or alternatively you can site mail staff. https://rule34.xxx/index.php?page=forum&s=view&id=4240
We reserve the right to disable or deny any key.

API Terms of service

    When using the rule34.xxx API or if you serve content from our CDN, you will not display any advertisements or run paywalls. This applies to all bots, apps, and websites.
    Do not use or request more than one API key. Using multiple keys will result in a suspension of your key or account.

Posts
List
Url for API access: https://api.rule34.xxx/index.php?page=dapi&s=post&q=index

    limit How many posts you want to retrieve. There is a hard limit of 1000 posts per request.
    pid The page number.
    tags The tags to search for. Any tag combination that works on the web site will work here. This includes all the meta-tags. See cheatsheet for more information.
    cid Change ID of the post. This is in Unix time so there are likely others with the same value if updated at the same time.
    id The post id.
    json Set to 1 for JSON formatted response.

Deleted Images
Url for API access: https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&deleted=show

    last_id A numerical value. Will return everything above this number.

Comments
List
Url for API access: https://api.rule34.xxx/index.php?page=dapi&s=comment&q=index

    post_id The id number of the comment to retrieve.

Tags
List
Url for API access: https://api.rule34.xxx/index.php?page=dapi&s=tag&q=index

    id The tag's id in the database. This is useful to grab a specific tag if you already know this value.
    limit How many tags you want to retrieve. There is a default limit of 100 per request.

Autocomplete
List
Url for API access: https://api.rule34.xxx/autocomplete.php?q=

    q= Enter any letter or incomplete tag. Not an official endpoint, but some people seem to rip the one from the main site. Use this one instead.
Danbooru offers a REST-like API to make scripting easy. All you need is a way to GET, POST, PUT and DELETE to URLs. Responses are given in either XML or JSON format.
Testing

API calls can be tested on https://testbooru.donmai.us. Scripts should be tested there before using them on the main site.
Basics

HTTP defines four basic request methods: GET, POST, PUT and DELETE. You'll be using these methods to interact with the Danbooru API. Most API calls that change the state of the database (like creating, updating, or deleting something) require an HTTP POST, PUT or DELETE call. API calls that only retrieve data can typically be done with an HTTP GET call.

A URL is considered a resource and the HTTP methods are actions you perform on the resource. For example, GET /posts/23.json returns a JSON representation of post #23. GET /posts/23.xml returns an XML representation. PUT or PATCH /posts/6.json would update the resource, for example changing its tags.

Some resources require parameters. For example, you can find tags that start with the letter 'a' by calling GET /tags.json?search[name_matches]=a*. This will give you a JSON listing of all tags with names starting with an a.

For POST, PUT and DELETE requests you must pass these parameters along in the body instead of the query parameters. Body parameters may be encoded in one of two ways. The usual way is with key-values pairs using "Content-Type: application/x-www-form-urlencoded":

curl -u "$login:$api_key" -X PUT "https://testbooru.donmai.us/posts/6.json" -d 'post[rating]=s&post[tag_string]=danboo'

Parameters may also be encoded as JSON using "Content-Type: application/json":

curl -u "$login:$api_key" -X PUT "https://testbooru.donmai.us/posts/6.json" -d '{ "post": { "rating": "s", "tag_string": "danboo" } }' -H "Content-Type: application/json" 

Responses

All API calls that change state will return a single element response (for XML calls). They are formatted like this:

<?xml version="1.0" encoding="UTF-8"?>
<response success="false" reason="duplicate"/>

For JSON responses, they'll look like this:

{ "success": false, "reason": "duplicate" }

While you can usually determine success or failure based on the response object, you can also figure out what happened based on the HTTP status code. In addition to the standard ones, Danbooru uses some custom status codes in the 4xx and 5xx range.

    200 OK: Request was successful
    204 No Content: Request was successful (returned by create actions)
    400 Bad Request: The given parameters could not be parsed
    401 Unauthorized: Authentication failed
    403 Forbidden: Access denied (see help:users for permissions information)
    404 Not Found: Not found
    410 Gone: Pagination limit (see help:users for pagination limits)
    420 Invalid Record: Record could not be saved
    422 Locked: The resource is locked and cannot be modified
    423 Already Exists: Resource already exists
    424 Invalid Parameters: The given parameters were invalid
    429 User Throttled: User is throttled, try again later (see help:users for API limits)
    500 Internal Server Error: A database timeout, or some unknown error occurred on the server
    502 Bad Gateway: Server cannot currently handle the request, try again later (returned during heavy load)
    503 Service Unavailable: Server cannot currently handle the request, try again later (returned during downbooru)

Authentication

You will need an API key if you need to login using the API. You can generate an API key by visiting your user profile and clicking the Generate API key button.

To authenticate with the API, pass the login and api_key URL parameters, where login is your username and api_key is your API key:

https://danbooru.donmai.us/profile.json?login=your_username&api_key=your_api_key

You can also authenticate using HTTP Basic Authentication:

curl "https://$username:$api_key@danbooru.donmai.us/profile.json"
curl --user "$username:$api_key" https://danbooru.donmai.us/profile.json

Most HTTP libraries support HTTP basic authentication out of the box. If yours doesn't, you can generate the authentication header manually. The format is Authentication: Basic $secret where $secret = base64($username + ":" + $api_key). In other words, concatenate your username and API key together, separated by a colon, then Base64 encode the result:

curl --header "Authorization: Basic $(printf "%s" "$username:$api_key" | base64)" https://danbooru.donmai.us/profile.json

If you are writing a user script for a browser, you do not need to embed an API key. You can rely on the user's session.

⚠️ IMPORTANT! Keep your API key secret. Treat it like a password. Gaining access to it allows full access to your account. Do not publicly post your API key or distribute it in scripts.
Rate Limits

There's a global rate limit on read requests of 10 requests per second regardless of account or endpoint.

Most kinds of update actions are rate limited according to user level:

    Basic users: 1 update/second
    Gold users and above: 4 updates/second

Each rate-limited endpoint has a burst pool, which lets a user make several consecutive updates before being rate limited. The rate at which the pool is recharged depends on the endpoint, but most follow the rates above.

The burst pool size, recharge rate, and current limits are returned as JSON in the x-rate-limit HTTP header. They can also be found at /rate_limits, which shows the limits as of the last API call (the page won't update until the API is used again).

Rate limits are shared between accounts and IP addresses: multiple accounts with the same IP address will share the same rate limit.
Queries
Common Search Parameters

All search endpoints support a common set of parameters:

    page Returns the given page. Subject to maximum page limits (see help:users).

You can also use b<id> and a<id> to request results before <id> or after <id>, respectively.
E.g. to get a page of posts before post #999999, you'd make a request to /posts.json?page=b999999.

    limit The number of results to return per page. The maximum limit is 200 for /posts.json and 1000 for everything else.
    search[id]
    search[created_at]
    search[updated_at]
    search[order]=custom Returns results in the same order as given by search[id]=3,2,1.

Parameter Parsing

Numeric search parameters support ranges:

    100
    >100
    >=100
    <100
    <=100
    100,200,300
    100..200 (inclusive)

Date parameters also support ranges:

    2012-01-01
    >2012-01-01
    >=2012-01-01
    <2012-01-01
    <=2012-01-01
    2012-01-01,2012-01-02
    2012-01-01..2013-01-01 (inclusive)

Boolean parameters accept any of the following values for true or false:

    True: true, t, yes, y, on, 1
    False: false, f, no, n, off, 0

Most string parameters support using asterisks (*) as wildcards. Wildcards can be escaped with \*. Literal backslashes can be escaped with \\.
Versioned Types

    API:Artists
    API:Artist commentaries
    API:Notes
    API:Pools
    API:Posts
    API:Wiki Pages

Type Versions

    API:Artist versions
    API:Artist commentary versions
    API:Note versions
    API:Pool versions
    API:Post versions
    API:Wiki page versions

Non-versioned Types

    API:Bulk update requests
    API:Comments
    API:Dmails
    API:Favorite groups
    API:Forum posts
    API:Forum topics
    API:Post appeals
    API:Post flags
    API:Tags
    API:Tag aliases
    API:Tag implications
    API:Uploads
    API:Users

Other Functions
Show

The base URL is GET /related_tag.json.

    query REQUIRED The tag to find the related tags for.
    category If specified, show only tags of a specific category. Can be: general, artist, copyright, character, meta

List of API endpoints

Verb   URI Pattern                                                  Controller#Action
GET    /posts/random(.:format)                                      posts#random
GET    /posts(.:format)                                             posts#index
GET    /posts/:id(.:format)                                         posts#show
PATCH  /posts/:id(.:format)                                         posts#update
PUT    /posts/:id(.:format)                                         posts#update
DELETE /posts/:id(.:format)                                         posts#destroy
GET    /autocomplete(.:format)                                      autocomplete#index
GET    /                                                            posts#index
GET    /admin/users/:id/edit(.:format)                              admin/users#edit
PATCH  /admin/users/:id(.:format)                                   admin/users#update
PUT    /admin/users/:id(.:format)                                   admin/users#update
GET    /admin/dashboard(.:format)                                   admin/dashboards#show
GET    /moderator/dashboard(.:format)                               moderator/dashboards#show
GET    /moderator/ip_addrs/search(.:format)                         moderator/ip_addrs#search
GET    /moderator/ip_addrs(.:format)                                moderator/ip_addrs#index
POST   /moderator/post/posts/:id/expunge(.:format)                  moderator/post/posts#expunge
GET    /moderator/post/posts/:id/confirm_move_favorites(.:format)   moderator/post/posts#confirm_move_favorites
POST   /moderator/post/posts/:id/move_favorites(.:format)           moderator/post/posts#move_favorites
GET    /moderator/post/posts/:id/confirm_ban(.:format)              moderator/post/posts#confirm_ban
POST   /moderator/post/posts/:id/ban(.:format)                      moderator/post/posts#ban
POST   /moderator/post/posts/:id/unban(.:format)                    moderator/post/posts#unban
GET    /moderator/ip_addrs/search(.:format)                         moderator/ip_addrs#search
GET    /moderator/ip_addrs(.:format)                                moderator/ip_addrs#index
GET    /explore/posts/popular(.:format)                             explore/posts#popular
GET    /explore/posts/curated(.:format)                             explore/posts#curated
GET    /explore/posts/viewed(.:format)                              explore/posts#viewed
GET    /explore/posts/searches(.:format)                            explore/posts#searches
GET    /explore/posts/missed_searches(.:format)                     explore/posts#missed_searches
GET    /maintenance/user/count_fixes/new(.:format)                  maintenance/user/count_fixes#new
POST   /maintenance/user/count_fixes(.:format)                      maintenance/user/count_fixes#create
GET    /maintenance/user/email_notification(.:format)               maintenance/user/email_notifications#show
DELETE /maintenance/user/email_notification(.:format)               maintenance/user/email_notifications#destroy
GET    /maintenance/user/deletion(.:format)                         maintenance/user/deletions#show
DELETE /maintenance/user/deletion(.:format)                         maintenance/user/deletions#destroy
POST   /maintenance/user/api_key/view(.:format)                     maintenance/user/api_keys#view
GET    /maintenance/user/api_key(.:format)                          maintenance/user/api_keys#show
PATCH  /maintenance/user/api_key(.:format)                          maintenance/user/api_keys#update
PUT    /maintenance/user/api_key(.:format)                          maintenance/user/api_keys#update
DELETE /maintenance/user/api_key(.:format)                          maintenance/user/api_keys#destroy
PUT    /artists/:id/revert(.:format)                                artists#revert
PUT    /artists/:id/ban(.:format)                                   artists#ban
PUT    /artists/:id/unban(.:format)                                 artists#unban
GET    /artists/show_or_new(.:format)                               artists#show_or_new
GET    /artists/banned(.:format)                                    artists#banned
GET    /artists(.:format)                                           artists#index
POST   /artists(.:format)                                           artists#create
GET    /artists/new(.:format)                                       artists#new
GET    /artists/:id/edit(.:format)                                  artists#edit
GET    /artists/:id(.:format)                                       artists#show
PATCH  /artists/:id(.:format)                                       artists#update
PUT    /artists/:id(.:format)                                       artists#update
DELETE /artists/:id(.:format)                                       artists#destroy
GET    /artist_urls(.:format)                                       artist_urls#index
GET    /artist_versions/search(.:format)                            artist_versions#search
GET    /artist_versions(.:format)                                   artist_versions#index
GET    /artist_versions/:id(.:format)                               artist_versions#show
GET    /bans(.:format)                                              bans#index
POST   /bans(.:format)                                              bans#create
GET    /bans/new(.:format)                                          bans#new
GET    /bans/:id/edit(.:format)                                     bans#edit
GET    /bans/:id(.:format)                                          bans#show
PATCH  /bans/:id(.:format)                                          bans#update
PUT    /bans/:id(.:format)                                          bans#update
DELETE /bans/:id(.:format)                                          bans#destroy
POST   /bulk_update_requests/:id/approve(.:format)                  bulk_update_requests#approve
GET    /bulk_update_requests(.:format)                              bulk_update_requests#index
POST   /bulk_update_requests(.:format)                              bulk_update_requests#create
GET    /bulk_update_requests/new(.:format)                          bulk_update_requests#new
GET    /bulk_update_requests/:id/edit(.:format)                     bulk_update_requests#edit
GET    /bulk_update_requests/:id(.:format)                          bulk_update_requests#show
PATCH  /bulk_update_requests/:id(.:format)                          bulk_update_requests#update
PUT    /bulk_update_requests/:id(.:format)                          bulk_update_requests#update
DELETE /bulk_update_requests/:id(.:format)                          bulk_update_requests#destroy
GET    /comment_votes(.:format)                                     comment_votes#index
DELETE /comments/:comment_id/votes(.:format)                        comment_votes#destroy
POST   /comments/:comment_id/votes(.:format)                        comment_votes#create
GET    /comments/search(.:format)                                   comments#search
POST   /comments/:id/undelete(.:format)                             comments#undelete
GET    /comments(.:format)                                          comments#index
POST   /comments(.:format)                                          comments#create
GET    /comments/new(.:format)                                      comments#new
GET    /comments/:id/edit(.:format)                                 comments#edit
GET    /comments/:id(.:format)                                      comments#show
PATCH  /comments/:id(.:format)                                      comments#update
PUT    /comments/:id(.:format)                                      comments#update
DELETE /comments/:id(.:format)                                      comments#destroy
GET    /counts/posts(.:format)                                      counts#posts
GET    /counts(.:format)                                            counts#index
POST   /counts(.:format)                                            counts#create
GET    /counts/new(.:format)                                        counts#new
GET    /counts/:id/edit(.:format)                                   counts#edit
GET    /counts/:id(.:format)                                        counts#show
PATCH  /counts/:id(.:format)                                        counts#update
PUT    /counts/:id(.:format)                                        counts#update
DELETE /counts/:id(.:format)                                        counts#destroy
PUT    /delayed_jobs/:id/run(.:format)                              delayed_jobs#run
PUT    /delayed_jobs/:id/retry(.:format)                            delayed_jobs#retry
PUT    /delayed_jobs/:id/cancel(.:format)                           delayed_jobs#cancel
GET    /delayed_jobs(.:format)                                      delayed_jobs#index
DELETE /delayed_jobs/:id(.:format)                                  delayed_jobs#destroy
POST   /dmails/mark_all_as_read(.:format)                           dmails#mark_all_as_read
GET    /dmails(.:format)                                            dmails#index
POST   /dmails(.:format)                                            dmails#create
GET    /dmails/new(.:format)                                        dmails#new
GET    /dmails/:id(.:format)                                        dmails#show
PATCH  /dmails/:id(.:format)                                        dmails#update
PUT    /dmails/:id(.:format)                                        dmails#update
POST   /dtext_preview(.:format)                                     dtext_previews#create
GET    /dtext_links(.:format)                                       dtext_links#index
GET    /emails(.:format)                                            emails#index
GET    /emails/:id(.:format)                                        emails#show
GET    /favorites(.:format)                                         favorites#index
POST   /favorites(.:format)                                         favorites#create
DELETE /favorites/:id(.:format)                                     favorites#destroy
PUT    /favorite_groups/:id/add_post(.:format)                      favorite_groups#add_post
GET    /favorite_groups/:favorite_group_id/order/edit(.:format)     favorite_group_orders#edit
GET    /favorite_groups(.:format)                                   favorite_groups#index
POST   /favorite_groups(.:format)                                   favorite_groups#create
GET    /favorite_groups/new(.:format)                               favorite_groups#new
GET    /favorite_groups/:id/edit(.:format)                          favorite_groups#edit
GET    /favorite_groups/:id(.:format)                               favorite_groups#show
PATCH  /favorite_groups/:id(.:format)                               favorite_groups#update
PUT    /favorite_groups/:id(.:format)                               favorite_groups#update
DELETE /favorite_groups/:id(.:format)                               favorite_groups#destroy
POST   /forum_posts/:id/undelete(.:format)                          forum_posts#undelete
GET    /forum_posts/search(.:format)                                forum_posts#search
GET    /forum_posts(.:format)                                       forum_posts#index
POST   /forum_posts(.:format)                                       forum_posts#create
GET    /forum_posts/new(.:format)                                   forum_posts#new
GET    /forum_posts/:id/edit(.:format)                              forum_posts#edit
GET    /forum_posts/:id(.:format)                                   forum_posts#show
PATCH  /forum_posts/:id(.:format)                                   forum_posts#update
PUT    /forum_posts/:id(.:format)                                   forum_posts#update
DELETE /forum_posts/:id(.:format)                                   forum_posts#destroy
GET    /forum_post_votes(.:format)                                  forum_post_votes#index
POST   /forum_post_votes(.:format)                                  forum_post_votes#create
DELETE /forum_post_votes/:id(.:format)                              forum_post_votes#destroy
POST   /forum_topics/:id/undelete(.:format)                         forum_topics#undelete
POST   /forum_topics/mark_all_as_read(.:format)                     forum_topics#mark_all_as_read
GET    /forum_topics(.:format)                                      forum_topics#index
POST   /forum_topics(.:format)                                      forum_topics#create
GET    /forum_topics/new(.:format)                                  forum_topics#new
GET    /forum_topics/:id/edit(.:format)                             forum_topics#edit
GET    /forum_topics/:id(.:format)                                  forum_topics#show
PATCH  /forum_topics/:id(.:format)                                  forum_topics#update
PUT    /forum_topics/:id(.:format)                                  forum_topics#update
DELETE /forum_topics/:id(.:format)                                  forum_topics#destroy
GET    /forum_topic_visits(.:format)                                forum_topic_visits#index
GET    /ip_bans(.:format)                                           ip_bans#index
POST   /ip_bans(.:format)                                           ip_bans#create
GET    /ip_bans/new(.:format)                                       ip_bans#new
PATCH  /ip_bans/:id(.:format)                                       ip_bans#update
PUT    /ip_bans/:id(.:format)                                       ip_bans#update
GET    /ip_addresses(.:format)                                      ip_addresses#index
GET    /ip_addresses/:id(.:format)                                  ip_addresses#show {:id=>/.+?(?=\.json|\.xml|\.html)|.+/}
GET    /iqdb_queries/preview(.:format)                              iqdb_queries#preview
GET    /iqdb_queries/check(.:format)                                redirect(301)
GET    /iqdb_queries(.:format)                                      iqdb_queries#show
POST   /iqdb_queries(.:format)                                      iqdb_queries#create
GET    /mod_actions(.:format)                                       mod_actions#index
POST   /mod_actions(.:format)                                       mod_actions#create
GET    /mod_actions/new(.:format)                                   mod_actions#new
GET    /mod_actions/:id/edit(.:format)                              mod_actions#edit
GET    /mod_actions/:id(.:format)                                   mod_actions#show
PATCH  /mod_actions/:id(.:format)                                   mod_actions#update
PUT    /mod_actions/:id(.:format)                                   mod_actions#update
DELETE /mod_actions/:id(.:format)                                   mod_actions#destroy
GET    /moderation_reports(.:format)                                moderation_reports#index
POST   /moderation_reports(.:format)                                moderation_reports#create
GET    /moderation_reports/new(.:format)                            moderation_reports#new
GET    /moderation_reports/:id(.:format)                            moderation_reports#show
GET    /modqueue(.:format)                                          modqueue#index
GET    /news_updates(.:format)                                      news_updates#index
POST   /news_updates(.:format)                                      news_updates#create
GET    /news_updates/new(.:format)                                  news_updates#new
GET    /news_updates/:id/edit(.:format)                             news_updates#edit
GET    /news_updates/:id(.:format)                                  news_updates#show
PATCH  /news_updates/:id(.:format)                                  news_updates#update
PUT    /news_updates/:id(.:format)                                  news_updates#update
DELETE /news_updates/:id(.:format)                                  news_updates#destroy
PUT    /notes/:id/revert(.:format)                                  notes#revert
GET    /notes(.:format)                                             notes#index
POST   /notes(.:format)                                             notes#create
GET    /notes/new(.:format)                                         notes#new
GET    /notes/:id/edit(.:format)                                    notes#edit
GET    /notes/:id(.:format)                                         notes#show
PATCH  /notes/:id(.:format)                                         notes#update
PUT    /notes/:id(.:format)                                         notes#update
DELETE /notes/:id(.:format)                                         notes#destroy
GET    /note_versions(.:format)                                     note_versions#index
GET    /note_versions/:id(.:format)                                 note_versions#show
GET    /note_previews(.:format)                                     note_previews#show
GET    /password_reset(.:format)                                    password_resets#show
POST   /password_reset(.:format)                                    password_resets#create
GET    /pixiv_ugoira_frame_data(.:format)                           pixiv_ugoira_frame_data#index
PUT    /pools/:id/revert(.:format)                                  pools#revert
POST   /pools/:id/undelete(.:format)                                pools#undelete
GET    /pools/gallery(.:format)                                     pools#gallery
GET    /pools/:pool_id/order/edit(.:format)                         pool_orders#edit
GET    /pools(.:format)                                             pools#index
POST   /pools(.:format)                                             pools#create
GET    /pools/new(.:format)                                         pools#new
GET    /pools/:id/edit(.:format)                                    pools#edit
GET    /pools/:id(.:format)                                         pools#show
PATCH  /pools/:id(.:format)                                         pools#update
PUT    /pools/:id(.:format)                                         pools#update
DELETE /pools/:id(.:format)                                         pools#destroy
POST   /pool_element(.:format)                                      pool_elements#create
GET    /pool_versions/:id/diff(.:format)                            pool_versions#diff
GET    /pool_versions/search(.:format)                              pool_versions#search
GET    /pool_versions(.:format)                                     pool_versions#index
GET    /post_replacements(.:format)                                 post_replacements#index
POST   /post_replacements(.:format)                                 post_replacements#create
GET    /post_replacements/new(.:format)                             post_replacements#new
PATCH  /post_replacements/:id(.:format)                             post_replacements#update
PUT    /post_replacements/:id(.:format)                             post_replacements#update
GET    /post_votes(.:format)                                        post_votes#index
GET    /posts/:post_id/events(.:format)                             post_events#index
GET    /posts/:post_id/replacements(.:format)                       post_replacements#index
POST   /posts/:post_id/replacements(.:format)                       post_replacements#create
GET    /posts/:post_id/replacements/new(.:format)                   post_replacements#new
PUT    /posts/:post_id/artist_commentary/create_or_update(.:format) artist_commentaries#create_or_update
PUT    /posts/:post_id/artist_commentary/revert(.:format)           artist_commentaries#revert
GET    /posts/:post_id/artist_commentary(.:format)                  artist_commentaries#show
DELETE /posts/:post_id/votes(.:format)                              post_votes#destroy
POST   /posts/:post_id/votes(.:format)                              post_votes#create
PUT    /posts/:id/revert(.:format)                                  posts#revert
PUT    /posts/:id/copy_notes(.:format)                              posts#copy_notes
GET    /posts/:id/show_seq(.:format)                                posts#show_seq
PUT    /posts/:id/mark_as_translated(.:format)                      posts#mark_as_translated
GET    /posts/:post_id/similar(.:format)                            iqdb_queries#index
GET    /post_appeals(.:format)                                      post_appeals#index
POST   /post_appeals(.:format)                                      post_appeals#create
GET    /post_appeals/new(.:format)                                  post_appeals#new
GET    /post_appeals/:id/edit(.:format)                             post_appeals#edit
GET    /post_appeals/:id(.:format)                                  post_appeals#show
PATCH  /post_appeals/:id(.:format)                                  post_appeals#update
PUT    /post_appeals/:id(.:format)                                  post_appeals#update
DELETE /post_appeals/:id(.:format)                                  post_appeals#destroy
GET    /post_flags(.:format)                                        post_flags#index
POST   /post_flags(.:format)                                        post_flags#create
GET    /post_flags/new(.:format)                                    post_flags#new
GET    /post_flags/:id/edit(.:format)                               post_flags#edit
GET    /post_flags/:id(.:format)                                    post_flags#show
PATCH  /post_flags/:id(.:format)                                    post_flags#update
PUT    /post_flags/:id(.:format)                                    post_flags#update
DELETE /post_flags/:id(.:format)                                    post_flags#destroy
GET    /post_approvals(.:format)                                    post_approvals#index
POST   /post_approvals(.:format)                                    post_approvals#create
GET    /post_disapprovals(.:format)                                 post_disapprovals#index
POST   /post_disapprovals(.:format)                                 post_disapprovals#create
GET    /post_disapprovals/:id(.:format)                             post_disapprovals#show
PUT    /post_versions/:id/undo(.:format)                            post_versions#undo
GET    /post_versions/search(.:format)                              post_versions#search
GET    /post_versions(.:format)                                     post_versions#index
PUT    /artist_commentaries/create_or_update(.:format)              artist_commentaries#create_or_update
GET    /artist_commentaries/search(.:format)                        artist_commentaries#search
PUT    /artist_commentaries/:id/revert(.:format)                    artist_commentaries#revert
GET    /artist_commentaries(.:format)                               artist_commentaries#index
GET    /artist_commentaries/:id(.:format)                           artist_commentaries#show
GET    /artist_commentary_versions(.:format)                        artist_commentary_versions#index
GET    /artist_commentary_versions/:id(.:format)                    artist_commentary_versions#show
GET    /related_tag(.:format)                                       related_tags#show
PATCH  /related_tag(.:format)                                       related_tags#update
PUT    /related_tag(.:format)                                       related_tags#update
GET    /recommended_posts(.:format)                                 recommended_posts#index
GET    /robots(.:format)                                            robots#index
GET    /saved_searches(.:format)                                    saved_searches#index
POST   /saved_searches(.:format)                                    saved_searches#create
GET    /saved_searches/new(.:format)                                saved_searches#new
GET    /saved_searches/:id/edit(.:format)                           saved_searches#edit
PATCH  /saved_searches/:id(.:format)                                saved_searches#update
PUT    /saved_searches/:id(.:format)                                saved_searches#update
DELETE /saved_searches/:id(.:format)                                saved_searches#destroy
GET    /session/sign_out(.:format)                                  sessions#sign_out
GET    /session/new(.:format)                                       sessions#new
DELETE /session(.:format)                                           sessions#destroy
POST   /session(.:format)                                           sessions#create
GET    /source(.:format)                                            sources#show
GET    /status(.:format)                                            status#show
GET    /tags(.:format)                                              tags#index
POST   /tags(.:format)                                              tags#create
GET    /tags/new(.:format)                                          tags#new
GET    /tags/:id/edit(.:format)                                     tags#edit
GET    /tags/:id(.:format)                                          tags#show
PATCH  /tags/:id(.:format)                                          tags#update
PUT    /tags/:id(.:format)                                          tags#update
DELETE /tags/:id(.:format)                                          tags#destroy
GET    /tag_aliases(.:format)                                       tag_aliases#index
GET    /tag_aliases/:id(.:format)                                   tag_aliases#show
DELETE /tag_aliases/:id(.:format)                                   tag_aliases#destroy
GET    /tag_implications(.:format)                                  tag_implications#index
GET    /tag_implications/:id(.:format)                              tag_implications#show
DELETE /tag_implications/:id(.:format)                              tag_implications#destroy
POST   /uploads/preprocess(.:format)                                uploads#preprocess
GET    /uploads/batch(.:format)                                     uploads#batch
GET    /uploads/image_proxy(.:format)                               uploads#image_proxy
GET    /uploads(.:format)                                           uploads#index
POST   /uploads(.:format)                                           uploads#create
GET    /uploads/new(.:format)                                       uploads#new
GET    /uploads/:id/edit(.:format)                                  uploads#edit
GET    /uploads/:id(.:format)                                       uploads#show
PATCH  /uploads/:id(.:format)                                       uploads#update
PUT    /uploads/:id(.:format)                                       uploads#update
DELETE /uploads/:id(.:format)                                       uploads#destroy
GET    /users/:user_id/favorite_groups(.:format)                    favorite_groups#index
GET    /users/:user_id/email/verify(.:format)                       emails#verify
POST   /users/:user_id/email/send_confirmation(.:format)            emails#send_confirmation
GET    /users/:user_id/email/edit(.:format)                         emails#edit
GET    /users/:user_id/email(.:format)                              emails#show
PATCH  /users/:user_id/email(.:format)                              emails#update
PUT    /users/:user_id/email(.:format)                              emails#update
GET    /users/:user_id/password/edit(.:format)                      passwords#edit
PATCH  /users/:user_id/password(.:format)                           passwords#update
PUT    /users/:user_id/password(.:format)                           passwords#update
POST   /users/:user_id/api_key/view(.:format)                       maintenance/user/api_keys#view
GET    /users/:user_id/api_key(.:format)                            maintenance/user/api_keys#show
PATCH  /users/:user_id/api_key(.:format)                            maintenance/user/api_keys#update
PUT    /users/:user_id/api_key(.:format)                            maintenance/user/api_keys#update
DELETE /users/:user_id/api_key(.:format)                            maintenance/user/api_keys#destroy
GET    /users/custom_style(.:format)                                users#custom_style
GET    /users(.:format)                                             users#index
POST   /users(.:format)                                             users#create
GET    /users/new(.:format)                                         users#new
GET    /users/:id/edit(.:format)                                    users#edit
GET    /users/:id(.:format)                                         users#show
PATCH  /users/:id(.:format)                                         users#update
PUT    /users/:id(.:format)                                         users#update
DELETE /users/:id(.:format)                                         users#destroy
GET    /user_upgrades(.:format)                                     user_upgrades#index
POST   /user_upgrades(.:format)                                     user_upgrades#create
GET    /user_upgrades/new(.:format)                                 user_upgrades#new
GET    /user_upgrades/:id(.:format)                                 user_upgrades#show
GET    /user_feedbacks(.:format)                                    user_feedbacks#index
POST   /user_feedbacks(.:format)                                    user_feedbacks#create
GET    /user_feedbacks/new(.:format)                                user_feedbacks#new
GET    /user_feedbacks/:id/edit(.:format)                           user_feedbacks#edit
GET    /user_feedbacks/:id(.:format)                                user_feedbacks#show
PATCH  /user_feedbacks/:id(.:format)                                user_feedbacks#update
PUT    /user_feedbacks/:id(.:format)                                user_feedbacks#update
GET    /user_name_change_requests(.:format)                         user_name_change_requests#index
POST   /user_name_change_requests(.:format)                         user_name_change_requests#create
GET    /user_name_change_requests/new(.:format)                     user_name_change_requests#new
GET    /user_name_change_requests/:id(.:format)                     user_name_change_requests#show
POST   /webhooks/receive(.:format)                                  webhooks#receive
GET    /webhooks(.:format)                                          webhooks#index
POST   /webhooks(.:format)                                          webhooks#create
GET    /webhooks/new(.:format)                                      webhooks#new
GET    /webhooks/:id/edit(.:format)                                 webhooks#edit
GET    /webhooks/:id(.:format)                                      webhooks#show
PATCH  /webhooks/:id(.:format)                                      webhooks#update
PUT    /webhooks/:id(.:format)                                      webhooks#update
DELETE /webhooks/:id(.:format)                                      webhooks#destroy
PUT    /wiki_pages/:id/revert(.:format)                             wiki_pages#revert {:id=>/.+?(?=\.json|\.xml|\.html)|.+/}
GET    /wiki_pages/search(.:format)                                 wiki_pages#search
GET    /wiki_pages/show_or_new(.:format)                            wiki_pages#show_or_new
GET    /wiki_pages(.:format)                                        wiki_pages#index
POST   /wiki_pages(.:format)                                        wiki_pages#create
GET    /wiki_pages/new(.:format)                                    wiki_pages#new
GET    /wiki_pages/:id/edit(.:format)                               wiki_pages#edit {:id=>/.+?(?=\.json|\.xml|\.html)|.+/}
GET    /wiki_pages/:id(.:format)                                    wiki_pages#show {:id=>/.+?(?=\.json|\.xml|\.html)|.+/}
PATCH  /wiki_pages/:id(.:format)                                    wiki_pages#update {:id=>/.+?(?=\.json|\.xml|\.html)|.+/}
PUT    /wiki_pages/:id(.:format)                                    wiki_pages#update {:id=>/.+?(?=\.json|\.xml|\.html)|.+/}
DELETE /wiki_pages/:id(.:format)                                    wiki_pages#destroy {:id=>/.+?(?=\.json|\.xml|\.html)|.+/}
GET    /wiki_page_versions/diff(.:format)                           wiki_page_versions#diff
GET    /wiki_page_versions(.:format)                                wiki_page_versions#index
GET    /wiki_page_versions/:id(.:format)                            wiki_page_versions#show
GET    /tag/index.xml(.:format)                                     legacy#tags {:format=>/xml/}
GET    /tag/index.json(.:format)                                    legacy#tags {:format=>/json/}
GET    /post/index.xml(.:format)                                    legacy#posts {:format=>/xml/}
GET    /post/index.json(.:format)                                   legacy#posts {:format=>/json/}
GET    /artist(.:format)                                            redirect(301)
GET    /artist/show/:id(.:format)                                   redirect(301, /artists/%{id})
GET    /artist/show(.:format)                                       redirect(301)
GET    /forum(.:format)                                             redirect(301)
GET    /forum/show/:id(.:format)                                    redirect(301)
GET    /pool/show/:id(.:format)                                     redirect(301, /pools/%{id})
GET    /post/index(.:format)                                        redirect(301)
GET    /post/atom(.:format)                                         redirect(301)
GET    /post/show/:id/:tag_title(.:format)                          redirect(301, /posts/%{id})
GET    /post/show/:id(.:format)                                     redirect(301, /posts/%{id})
GET    /tag(.:format)                                               redirect(301)
GET    /tag/index(.:format)                                         redirect(301)
GET    /user/show/:id(.:format)                                     redirect(301, /users/%{id})
GET    /wiki/show(.:format)                                         redirect(301)
GET    /help/:title(.:format)                                       redirect(301)
GET    /login(.:format)                                             sessions#new
GET    /logout(.:format)                                            sessions#sign_out
GET    /profile(.:format)                                           users#profile
GET    /settings(.:format)                                          users#settings
GET    /sitemap(.:format)                                           static#sitemap_index
GET    /opensearch(.:format)                                        static#opensearch
GET    /privacy(.:format)                                           static#privacy_policy
GET    /terms_of_service(.:format)                                  static#terms_of_service
GET    /static/keyboard_shortcuts(.:format)                         static#keyboard_shortcuts
GET    /static/bookmarklet(.:format)                                static#bookmarklet
GET    /static/site_map(.:format)                                   static#site_map
GET    /static/contact(.:format)                                    static#contact
GET    /static/dtext_help(.:format)                                 static#dtext_help
GET    /static/terms_of_service(.:format)                           redirect(301)
GET    /mock/recommender/recommend/:user_id(.:format)               mock_services#recommender_recommend
GET    /mock/recommender/similiar/:post_id(.:format)                mock_services#recommender_similar
GET    /mock/reportbooru/missed_searches(.:format)                  mock_services#reportbooru_missed_searches
GET    /mock/reportbooru/post_searches/rank(.:format)               mock_services#reportbooru_post_searches
GET    /mock/reportbooru/post_views/rank(.:format)                  mock_services#reportbooru_post_views
GET    /mock/iqdbs/similar(.:format)                                mock_services#iqdbs_similar
POST   /mock/iqdbs/similar(.:format)                                mock_services#iqdbs_similar
       /*other(.:format)                                            static#not_found

       Help: API 1.13.0+update.3

Moebooru offers API which is mostly compatible with Danbooru API (version 1.13.0) to make scripting easy. All you need is a way to GET and POST to URLs. The ability to parse XML or JSON responses is nice, but not critical. The simplicity of the API means you can write scripts using JavaScript, Perl, Python, Ruby, even shell languages like bash or tcsh.

Change Log | Posts | Tags | Artists | Comments | Wiki | Notes | Users | Forum | Pools
Basics

HTTP defines two request methods: GET and POST. You'll be using these two methods to interact with the Danbooru API. Most API calls that change the state of the database (like creating, updating, or deleting something) require an HTTP POST call. API calls that only retrieve data can typically be done with an HTTP GET call.

In the Danbooru API, a URL is analogous to a function name. You pass in the function parameters as a query string. Here's an extremely simple example: /post.xml?limit=1.

The post part indicates the controller we're working with. In this case it's posts. index describes the action. Here we're retrieving a list of posts. Finally, the xml part describes what format we want the response in. You can specify .xml for XML responses, .json for JSON responses, and nothing at all for HTML responses.
Responses

All API calls that change state will return a single element response (for XML calls). They are formatted like this:
<?xml version="1.0" encoding="UTF-8"?>
<response success="false" reason="duplicate"/>

For JSON responses, they'll look like this:
{success: false, reason: "duplicate"}

While you can usually determine success or failure based on the response object, you can also figure out what happened based on the HTTP status code. In addition to the standard ones, Danbooru uses some custom status codes in the 4xx and 5xx range.
Status Code 	Meaning
200 OK 	Request was successful
403 Forbidden 	Access denied
404 Not Found 	Not found
420 Invalid Record 	Record could not be saved
421 User Throttled 	User is throttled, try again later
422 Locked 	The resource is locked and cannot be modified
423 Already Exists 	Resource already exists
424 Invalid Parameters 	The given parameters were invalid
500 Internal Server Error 	Some unknown error occurred on the server
503 Service Unavailable 	Server cannot currently handle the request, try again later
JSON Responses

While you will probably want to work with XML in the majority of cases, if you're writing something in Javascript then the JSON responses may be preferable. They are much faster to parse and there's less code to write to get your data structure:
var data = JSON.parse(responseText)
alert(data.response)
Logging In

Some actions may require you to log in. For any action you can always specify two parameters to identify yourself:

    login Your login name.
    password_hash Your SHA1 hashed password. Simply hashing your plain password will NOT work since Danbooru salts its passwords. The actual string that is hashed is "choujin-steiner--your-password--".

Please be aware of the security risks involved in sending your password through an unencrypted channel. Although your password will be hashed, it is still theoretically possible for someone to steal your account by creating a fake cookie based on your hashed password.
Posts
List

The base URL is /post.xml.

    limit How many posts you want to retrieve. There is a hard limit of 100 posts per request.
    page The page number.
    tags The tags to search for. Any tag combination that works on the web site will work here. This includes all the meta-tags.

Create

The base URL is /post/create.xml. There are only two mandatory fields: you need to supply the tags, and you need to supply the file, either through a multipart form or through a source URL.

    post[tags] A space delimited list of tags.
    post[file] The file data encoded as a multipart form.
    post[rating] The rating for the post. Can be: safe, questionable, or explicit.
    post[source] If this is a URL, Danbooru will download the file.
    post[is_rating_locked] Set to true to prevent others from changing the rating.
    post[is_note_locked] Set to true to prevent others from adding notes.
    post[parent_id] The ID of the parent post.
    md5 Supply an MD5 if you want Danbooru to verify the file after uploading. If the MD5 doesn't match, the post is destroyed.

If the call fails, the following response reasons are possible:

    MD5 mismatch This means you supplied an MD5 parameter and what Danbooru got doesn't match. Try uploading the file again.
    duplicate This post already exists in Danbooru (based on the MD5 hash). An additional attribute called location will be set, pointing to the (relative) URL of the original post.
    other Any other error will have its error message printed.

If the post upload succeeded, you'll get an attribute called location in the response pointing to the relative URL of your newly uploaded post.
Update

The base URL is /post/update.xml. Only the id parameter is required. Leave the other parameters blank if you don't want to change them.

    id The id number of the post to update.
    post[tags] A space delimited list of tags.
    post[file] The file data encoded as a multipart form.
    post[rating] The rating for the post. Can be: safe, questionable, or explicit.
    post[source] If this is a URL, Danbooru will download the file.
    post[is_rating_locked] Set to true to prevent others from changing the rating.
    post[is_note_locked] Set to true to prevent others from adding notes.
    post[parent_id] The ID of the parent post.

Destroy

You must be logged in to use this action. You must also be the user who uploaded the post (or you must be a moderator).

    id The id number of the post to delete.

Revert Tags

This action reverts a post to a previous set of tags. The base URL is /post/revert_tags.xml.

    id The post id number to update.
    history_id The id number of the tag history.

Vote

This action lets you vote for a post. You can only vote once per post per IP address. The base URL is /post/vote.xml.

    id The post id number to update.
    score Set to 1 to vote up and -1 to vote down. All other values will be ignored.

If the call did not succeed, the following reasons are possible:

    already voted You have already voted for this post.
    invalid score You have supplied an invalid score.

Tags
List

The base URL is /tag.xml.

    limit How many tags to retrieve. Setting this to 0 will return every tag.
    page The page number.
    order Can be date, count, or name.
    id The id number of the tag.
    after_id Return all tags that have an id number greater than this.
    name The exact name of the tag.
    name_pattern Search for any tag that has this parameter in its name.

Update

The base URL is /tag/update.xml.

    name The name of the tag to update.
    tag[tag_type] The tag type. General: 0, artist: 1, copyright: 3, character: 4.
    tag[is_ambiguous] Whether or not this tag is ambiguous. Use 1 for true and 0 for false.

Related

The base URL is /tag/related.xml.

    tags The tag names to query.
    type Restrict results to this tag type (can be general, artist, copyright, or character).

Artists
List

The base URL is /artist.xml.

    name The name (or a fragment of the name) of the artist.
    order Can be date or name.
    page The page number.

Create

The base URL is /artist/create.xml.

    artist[name] The artist's name.
    artist[urls] A list of URLs associated with the artist, whitespace delimited.
    artist[alias] The artist that this artist is an alias for. Simply enter the alias artist's name.
    artist[group] The group or cicle that this artist is a member of. Simply enter the group's name.

Update

The base URL is /artist/update.xml. Only the id parameter is required. The other parameters are optional.

    id The id of thr artist to update.
    artist[name] The artist's name.
    artist[urls] A list of URLs associated with the artist, whitespace delimited.
    artist[alias] The artist that this artist is an alias for. Simply enter the alias artist's name.
    artist[group] The group or cicle that this artist is a member of. Simply enter the group's name.

Destroy

The base URL is /artist/destroy.xml. You must be logged in to delete artists.

    id The id of the artist to destroy.

Comments
Show

The base URL is /comment/show.xml. This retrieves a single comment.

    id The id number of the comment to retrieve.

Create

The base URL is /comment/create.xml.

    comment[anonymous] Set to 1 if you want to post this comment anonymously.
    comment[post_id] The post id number to which you are responding.
    comment[body] The body of the comment.

Destroy

The base url is /comment/destroy.xml. You must be logged in to use this action. You must also be the owner of the comment, or you must be a moderator.

    id The id number of the comment to delete.

Wiki

All titles must be exact (but case and whitespace don't matter).
List

The base URL is /wiki.xml. This retrieves a list of every wiki page.

    order How you want the pages ordered. Can be: title, date.
    limit The number of pages to retrieve.
    page The page number.
    query A word or phrase to search for.

Create

The base URL is /wiki/create.xml.

    wiki_page[title] The title of the wiki page.
    wiki_page[body] The body of the wiki page.

Update

The base URL is /wiki/update.xml. Potential error reasons: "Page is locked"

    title The title of the wiki page to update.
    wiki_page[title] The new title of the wiki page.
    wiki_page[body] The new body of the wiki page.

Show

The base URL is /wiki/show.xml. Potential error reasons: "artist type"

    title The title of the wiki page to retrieve.
    version The version of the page to retrieve.

Destroy

The base URL is /wiki/destroy.xml. You must be logged in as a moderator to use this action.

    title The title of the page to delete.

Lock

The base URL is /wiki/lock.xml. You must be logged in as a moderator to use this action.

    title The title of the page to lock.

Unlock

The base URL is /wiki/unlock.xml. You must be logged in as a moderator to use this action.

    title The title of the page to unlock.

Revert

The base URL is /wiki/revert.xml. Potential error reasons: "Page is locked"

    title The title of the wiki page to update.
    version The version to revert to.

History

The base URL is /wiki/history.xml.

    title The title of the wiki page to retrieve versions for.

Notes
List

The base URL is /note.xml.

    post_id The post id number to retrieve notes for.

Search

The base URL is /note/search.xml.

    query A word or phrase to search for.

History

The base URL is /note/history.xml. You can either specify id, post_id, or nothing. Specifying nothing will give you a list of every note verison.

    limit How many versions to retrieve.
    page The offset.
    post_id The post id number to retrieve note versions for.
    id The note id number to retrieve versions for.

Revert

The base URL is /note/revert.xml. Potential error reasons: "Post is locked"

    id The note id to update.
    version The version to revert to.

Create/Update

The base URL is /note/update.xml. Notes differ from the other controllers in that the interface for creation and updates is the same. If you supply an id parameter, then Danbooru will assume you're updating an existing note. Otherwise, it will create a new note. Potential error reasons: "Post is locked"

    id If you are updating a note, this is the note id number to update.
    note[post_id] The post id number this note belongs to.
    note[x] The x coordinate of the note.
    note[y] The y coordinate of the note.
    note[width] The width of the note.
    note[height] The height of the note.
    note[is_active] Whether or not the note is visible. Set to 1 for active, 0 for inactive.
    note[body] The note message.

Users
Search

The base URL is /user.xml. If you don't specify any parameters you'll get a listing of all users.

    id The id number of the user.
    name The name of the user.

Forum
List

The base URL is /forum.xml. If you don't specify any parameters you'll get a list of all the parent topics.

    parent_id The parent ID number. You'll return all the responses to that forum post.

Pools
List Pools

The base URL is /pool.xml. If you don't specify any parameters you'll get a list of all pools.

    query The title.
    page The page.

List Posts

The base URL is /pool/show.xml. If you don't specify any parameters you'll get a list of all pools.

    id The pool id number.
    page The page.

Update

The base URL is /pool/update.xml.

    id The pool id number.
    pool[name] The name.
    pool[is_public] 1 or 0, whether or not the pool is public.
    pool[description] A description of the pool.

Create

The base URL is /pool/create.xml.

    pool[name] The name.
    pool[is_public] 1 or 0, whether or not the pool is public.
    pool[description] A description of the pool.

Destroy

The base URL is /pool/destroy.xml.

    id The pool id number.

Add Post

The base URL is /pool/add_post.xml. Potential error reasons: "Post already exists", "access denied"

    pool_id The pool to add the post to.
    post_id The post to add.

Remove Post

The base URL is /pool/remove_post.xml. Potential error reasons: "access denied"

    pool_id The pool to remove the post from.
    post_id The post to remove.

Favorites
List Users

The base URL is /favorite/list_users.json. There is no XML API for this action.

    id The post id.

