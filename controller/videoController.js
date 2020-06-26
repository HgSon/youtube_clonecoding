import { videosDB } from '../db'
import routes from '../routes';

export const home = (req,res)=> 
    res.render('home', {
        pageTitle: 'home',
        videosDB
    });

export const search = (req,res)=> {
    const {query: {term: searchingBy}} = req;
    // const searchingBy = req.query.term;
    res.render('search', {pageTitle: 'Search', searchingBy, videosDB});
}

export const videos = (req, res)=>  res.render('videos',{pageTitle: 'Videos'});

export const getUpload = (req, res)=>  res.render('upload',{pageTitle: 'Upload'});
export const postUpload = (req, res) => {
    const {body:{description, title, videoFile}} = req;
    res.redirect(routes.videoDetail(12));
    //To do: upload and save
}

export const videoDetail = (req, res)=>  res.render('videoDetail', {pageTitle: 'Video Detail'});
export const editVideo = (req, res)=>  res.render('editVideo', {pageTitle: 'Edit Video'});
export const deleteVideo = (req, res)=>  res.send('deleteVideo');