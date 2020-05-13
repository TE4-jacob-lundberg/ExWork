export const schema = {
  name: 'MyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'games',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'abbreviation', keypath: 'abbreviation', options: { unique: false } },
        { name: 'image', keypath: 'image', options: { unique: false }},
        { name: 'links', keypath: 'links', options: { unique: false }},
        { name: 'filenNames', keypath: 'fileNames', options: { unique: false }},
      ],
    },
  ],
};
