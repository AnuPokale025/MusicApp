import apiClient from "./api"

const UserApi = {

    // ============get playlist=============

    getAllPlaylist: async () => {
        try {
            const res = await apiClient.get('/playlists');
            return res.data;
        } catch (err) {
            throw err.response?.data || err;
        }
    },

    createplaylist: async (data, userId, songId) => {
        try {
            const res = await apiClient.post(
                `/playlists/user/${userId}`,
                data
            );

            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    getplaylistById: async (playlistId) => {
        try {
            const res = await apiClient.get(`/playlists/${playlistId}`)
            return res.data
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    removeplaylist: async (playlistId) => {
        try {
            const res = await apiClient.delete(`/playlists/${playlistId}`)
            return res.data
        } catch (error) {
            throw error.response?.data || error;
        }
    },


    //=============Song Api=================

    getAllSongs: async () => {
        try {
            const res = await apiClient.get('/song')
            return res.data;
        } catch (error) {
            throw error.response?.data || error
        }
    },

    addSong: async (data, adminId) => {
        try {
            const res = await apiClient.post(`/song/${adminId}`, data);
            return res.data;
        } catch (error) {
            throw error.response?.data || error
        }
    },

    getSongById: async (songId) => {
        try {
            const res = await apiClient.get(`/song/${songId}`);
            return res.data;
        } catch (error) {
            throw error.response?.data || error
        }
    },
    removeSong: async (songId) => {
        try {
            const res = await apiClient.delete(`/song/${songId}`);
            return res.data;
        } catch {
            throw error.response?.data || error
        }
    },

    //====================favorite====================

    getAllFavoriteSong: async () => {
        try {
            const res = await apiClient.get('/favorites');
            return res.data;
        } catch (error) {
            throw error.response?.data || error
        }
    },

    addFavoriteSong: async (data, userId, playlistId, songId) => {
        try {
            const res = await apiClient.post(`/favorites/${userId}/${playlistId}/${songId}`, data);
            return res.data;
        } catch (error) {
            throw error.response?.data || error
        }
    },

    removeFavoriteSong: async (favoriteId) => {
        try {
            const res = await apiClient.delete(`/favorite/${favoriteId}`);
            return res.data
        } catch (error) {
            throw error.response?.data || error
        }
    }
}

export default UserApi;