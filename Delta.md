# About
This reperesents all delta from a known commit/reference to the latest/then latest. By default, inital commit. Its progressive and incremental.

# Draft
# Date
# Architecture
## Ratings page
## Text Page
## Sign in page
## Save page
## Review page



# 25 Sept 2025
## Architecture
- Migrated all headers to use `ShopHeaderV2`
- Better prompts: more personalized, better structure
- Improved consistently in styling and components (shop text headers more specifically) used
- Removed hardcoded colors styling from many places
- Removed unused imports from many places
## Ratings page
- [ROLLBACK] Made auto-submit on selecting rating using `useEffect`
- [ROLLBACK] Hidden submit button
- Added owner name below main heading
- Added custom image above shop text header. For all pages. Use `ImageHeader`. Fixed size to 32x32.
- Experimented custom layout for (images+form). Its of split screen kind 1:2 split in horizontal dir. Use image header `ImageHeaderV2`
- Auto-center main ratings form
## Text Page
- Auto-center main text form
- Removed hardcoded colors styling
## Sign in page
## Save page
- Removed excess margin from top
## Review page
- Refined styling for a better more aesthetic look



# 26 Sept 2025
# Architecture
- Built a dynamic generic classic/tailwind CSS styles generator
- Built an image generation engine with declarative easy-to-use props/interface and highly customizable internal CSS styling. Ships with sane defaults
- Replicated split screen layout with image+content, this time with vastly greater flexibility in generating image
## Ratings page
## Text Page
## Sign in page
## Save page
## Review page