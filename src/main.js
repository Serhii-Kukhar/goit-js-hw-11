
import { searchImage } from './js/pixabay-api';
import { renderImages, refs } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

refs.formEl.addEventListener('submit', event => {
    event.preventDefault();
    

    const searchQuery = event.target.elements.query.value.trim(); 
    

    if (searchQuery === '') {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search query.',
            position: 'topRight',
            timeout: 4000, 
        });
        return;
        
    }


    refs.imageEl.innerHTML = '';
    event.target.elements.query.value = '';

    
    searchImage(searchQuery)
        .then(data => {
            
            if (data && data.hits) {
                renderImages(data.hits);
            }
        })
        .catch(error => {
            
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                timeout: 4000,
                
            });
        });
        
});



