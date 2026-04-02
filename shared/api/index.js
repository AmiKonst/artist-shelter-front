import useArtistsApi from '🔗/api/artists';
import useDonatsApi from '🔗/api/donats';

const api = {
    artists: () => useArtistsApi(),
    donats: () => useDonatsApi()
}

export default api;