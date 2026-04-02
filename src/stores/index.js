import { default as sharedStores } from '🔗/stores';
import useArtistsStore from '@/stores/artists';

const stores = {
    ...sharedStores,
    artists: useArtistsStore
}

export default stores;
