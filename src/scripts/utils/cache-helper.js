import CONFIG from '../globals/config';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    await cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames
        .filter((name) => name !== CONFIG.CACHE_NAME)
        .map((filteredName) => caches.delete(filteredName)),
    );
  },

  async revalidateCache(request) {
    const response = await caches.match(request);
    if (response) {
      return response;
    }
    return this._fetchRequest(request);
  },

  async _openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async _fetchRequest(request) {
    try {
      const response = await fetch(request);
      if (!response || response.status !== 200) {
        return response;
      }
      await this._addCache(request);
      return response;
    } catch (error) {

      console.error('Error fetching request:', error);
      return caches.match(request);
    }
  },

  async _addCache(request) {
    const cache = await this._openCache();
    await cache.add(request);
  },
};

export default CacheHelper;
