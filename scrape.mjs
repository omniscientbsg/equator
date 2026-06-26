import scrape from 'website-scraper';

const options = {
  urls: ['https://www.produx.design/'],
  directory: './public/produx',
  recursive: true,
  maxDepth: 1,
  filenameGenerator: 'bySiteStructure',
  urlFilter: function(url) {
    return url.indexOf('produx.design') !== -1 || url.indexOf('cdn') !== -1 || url.indexOf('webflow') !== -1;
  }
};

console.log("Starting scrape of produx.design...");

scrape(options).then((result) => {
  console.log("Scrape successful! All files downloaded to /public/produx");
}).catch((err) => {
  console.error("Scrape failed:", err);
});
