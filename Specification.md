A website/web app read only in version 1.
Using Next JS 15 latest stable and Next UI for the components the app will need.
Using tailwind,pnpm
Allows people to select a category for laptop reviews e.g. best laptop under £400, under £500 allow for extensibility of categories
Want to use MDX files for the content which are supplied in a folder mdx_content and then further orgaised into years and months. There will be content twice per month. The mdx in version 1 will look like markdwon but be ready for mdx consumption.
I want a mobile responsive and the main menu can have 1 level of nesting.

Colors to use #232638, #0fa3b1, #f74554, #b5e2fa, #f9f7f3

Need an About page and blog,brand,reviews sections for v1
pages will use static generation by Next.JS it will itterate over the folders in content and create pages and routes from the mdx. I also need good SEO so the meta tags will need generation and also a canonical url.

We need to have tags function so that a tag would be 'acer' and clicking on that would load a page with all articles that have that tag. So the mdx will have a place to define the tags. This will use Next.js routing.

Design and UI goals
User comes with an expectation to find the best laptop in their category such as best high end laptop. So the hompage will feature cards with categories. For a particular page which will be the most up to date page in the category of say laptops under £1000 (laptops under £1000 Mar 2025, laptops under £1000 Feb 2025, laptops under £1000 Jan 2025) The main homepage will promote the latest pages and the older pages get pushed down or archived though you can find links to them deeper. We don't need a classical menu as such. I like menus that takeove the whole viewport with a big x to close. regardless of device. The main message to get across on the homepage is that our reviews are the most up to date and save time for the client as AI has scanned and collated the data from the web.

On the category pages such as best laptops under £600 Mar 2025 we will pick a winner and show that in a nice box and have an image which will be in the markdown. Then there will be other choices. There will be links to go and buy the laptops.

A search functionality will also need to be created.

Let us break this down into steps to get the build on the way..
