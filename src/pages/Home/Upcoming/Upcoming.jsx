import image from '../../../assets/image1.png';

const Upcoming = () => {
    return (
        <div className='mt-20 md:mt-24 pb-8'>
             <h2 className="text-2xl md:text-3xl font-semibold text-center">Upcoming Events</h2>
            <div className="flex items-center justify-center gap-2"> 
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">Exclusive</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>
            <div className='md:flex items-center gap-8 mt-12 p-4'>
                <div>
                    <h2 className="text-2xl md:text-4xl font-semibold">Join the Excitement at Sports Academies!</h2>
                    <p className='my-6'>Discover the thrilling lineup of upcoming events at Sports Academies! We are passionate about providing our students with opportunities to showcase their skills, compete, and grow as athletes. Mark your calendars and get ready for an action-packed schedule of sports tournaments, workshops, and special events.</p>
                    <button className='btn-all'>Explore Now &#x2192;</button>
                </div>
                <div>
                    <img src={image} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Upcoming;