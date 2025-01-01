import glob from 'glob';
import fs from 'fs';

const { sync: globSync } = glob;

export const RESOURCE_DELIMITER = '=================================================================================='

const lists = globSync('./app/(content)/music/lists/(pages)/**/page.mdx');
const arists = globSync('./app/(content)/music/artists/(pages)/**/page.mdx');
const vinyls = globSync('./app/(content)/music/vinyls/(pages)/**/page.mdx');

function getAllFilesContent(files) {
  let allContent = '';
  files.forEach((file) => {
    const fileContent = fs.readFileSync(file, 'utf8');
    allContent += `\n\nFile name: ${file}\n\n` + fileContent + '\n\n' + RESOURCE_DELIMITER;
  });
  return allContent;
}

function saveContent(filename, contentFile) {
  fs.writeFileSync(`./data/${filename}.ts`, 'const content = `' + getAllFilesContent(contentFile) + '`; export default content;', function (err) {
    if (err) {
      return console.log(err);
    }
  });

  console.log('The file was saved!');
}

saveContent('lists', lists);
saveContent('artists', arists);
saveContent('vinyls', vinyls);

