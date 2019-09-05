import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchImage, fetchImages, fetchMoreImages, removeImage } from '../redux/actions/imagesAction';

//new: 58214ab914962a3b825b63a2306b696dca9f8a58bfa5bf6a0e8affc4213ed62c
//old: de31bf154ddcc3ff4c380dcf5c21808a3899b02a88fbf7cfbb11dbb1d02d35e1

const PhotoGrid = (props) => { 
    const { imgArr, isLoaded, isSearched } = props; 
    let photoGridHeight = 1500 ;    
    
    const [page, setPage ] = useState(1);
    
    useEffect(()=>{        
        props.removeImage(); 
        if(page > 1){
            props.fetchMoreImages(page)	
        }else{
            props.fetchImages(page)
        }        
        window.addEventListener('scroll', handleScroll);        
        return () =>{window.removeEventListener('scroll', handleScroll);}
    },[])
    
    const handleClick = (e) => {
        const imgId = e.target.id;        
        props.fetchImage(imgId);
        props.history.push('/image/'+imgId)
    }
    
    const handleScroll = (e) =>{
        e.stopPropagation();
        let windowScrolled = window.scrollY;        
       
        if( (photoGridHeight -  windowScrolled) < 1000 ){           
            setPage(page + 1)
            console.log(page)
			photoGridHeight += 1500;
            		
            
        }      
    }
    
     const UnsplashImage = () => {
        const imgArr1  = []; 
        const imgArr2  = [];
        const imgArr3  = []; 
        
        for ( let i = 0; i < imgArr.length; i++) {
            if ((i + 1) % 3 === 0) {
                imgArr3.push(imgArr[i]);
            } else if ((i + 1) % 2 === 0) {
                imgArr2.push(imgArr[i]);
            } else {
                imgArr1.push(imgArr[i]);
            }
        }
         
        const col1 = imgArr1.map((image, index) =>{return(<img src={image.urls.regular} id={image.id} className="image" key={index} onClick={handleClick}/>)});
        const col2 = imgArr2.map((image, index) =>{return(<img src={image.urls.regular} id={image.id} className="image" key={index} onClick={handleClick}/>)});
        const col3 = imgArr3.map((image, index) =>{return(<img src={image.urls.regular} id={image.id} className="image" key={index} onClick={handleClick}/>)});
         
        return(
            <div className="flex p-2 bd-highlight">
                
                <div className="flex-item" id="col1">
                    <div className="image-column">{col1}</div>
                </div>    
                <div className="flex-item" id="col2">
                    <div className="image-column">{col2}</div>
                </div>
                <div className="flex-item" id="col3">
                     <div className="image-column">{col3}</div>
                </div>
            </div>
        )
    }    
  
    return(
      <div className="photo-grid" id="photoGrid">
            {
                isLoaded ? <UnsplashImage></UnsplashImage> : 
                <div className="loading-container">
                    <div className="">Loading...</div>
                </div>
            }
      </div>
    )  
}

const mapStateToProps = (state) =>{
    return {
        imgArr : state.imgArr,
        isLoaded: state.isLoaded,
        isSearched: state.isSearched
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchImage : (imgId) => {dispatch(fetchImage(imgId))},
        removeImage : () => {dispatch(removeImage())},
        fetchImages: (page) => {dispatch(fetchImages(page))},
        fetchMoreImages: (page) => {dispatch(fetchMoreImages(page))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGrid);
