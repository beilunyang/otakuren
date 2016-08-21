export const GET_COMIC_CATEGORYS = () => 'http://picaman.picacomic.com/api/categories';

export const GET_COMIC_LIST = (id, page=1) => `http://picaman.picacomic.com/api/categories/${id}/page/${page}/comics`;

export const GET_COMIC = (id) => `http://picaman.picacomic.com/api/comics/${id}`; 

export const GET_COMIC_EP =	(id, ep=1) => `http://picaman.picacomic.com/api/comics/${id}/ep/${ep}`;

export const SEARCH_COMICS = (value, page=1) => `http://picaman.picacomic.com/api/search/${value}/comics/page/${page}`;
