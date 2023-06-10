import slider1 from '../../../assets/slider-1.jpg'
import slider2 from '../../../assets/slider-2.avif'
import slider3 from '../../../assets/slider-3.avif'

const Slider = () => {
    return (
        <div className="carousel w-full mt-12">
            <div id="slide1" className="carousel-item relative w-full h-[100vh]">
                <img src={slider1}  className="w-full" />
                <div className='absolute flex flex-col items-center justify-center w-full h-[90vh]'>
                    <h2 className="text-xl md:text-3xl font-semibold w-3/4 text-center">Athletic Potential with Sports Academies</h2>
                    <p className='w-3/4 mt-4 text-center'>Welcome to Sports Academies, where passion meets excellence in sports education and training. Our comprehensive programs are designed to help individuals of all ages and skill levels unlock their athletic potential and excel in their chosen sport.</p>
                    <button className='btn-all mt-4'>Explore Now &#x2192;</button>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 md:top-1/2 bottom-0">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full h-[100vh]">
                <img src={slider2} className="w-full" />
                <div className='absolute flex flex-col items-center justify-center w-full h-[90vh]'>
                    <h2 className="text-xl md:text-3xl font-semibold w-3/4 text-center">Athletic Potential with Sports Academies</h2>
                    <p className='w-3/4 mt-4 text-center'>Welcome to Sports Academies, where passion meets excellence in sports education and training. Our comprehensive programs are designed to help individuals of all ages and skill levels unlock their athletic potential and excel in their chosen sport.</p>
                    <button className='btn-all mt-4'>Explore Now &#x2192;</button>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 md:top-1/2 bottom-0">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full h-[100vh]">
                <img src={slider3} className="w-full" />
                <div className='absolute flex flex-col items-center justify-center w-full h-[90vh]'>
                    <h2 className="text-xl md:text-3xl font-semibold w-3/4 text-center">Athletic Potential with Sports Academies</h2>
                    <p className='w-3/4 mt-4 text-center'>Welcome to Sports Academies, where passion meets excellence in sports education and training. Our comprehensive programs are designed to help individuals of all ages and skill levels unlock their athletic potential and excel in their chosen sport.</p>
                    <button className='btn-all mt-4'>Explore Now &#x2192;</button>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 md:top-1/2 bottom-0">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Slider;