import image from '../../../assets/image1.png';

const Upcoming = () => {
    return (
        <div className='mt-12 pb-8'>
            <h2 className="text-3xl font-semibold text-center">Upcoming Event</h2>
            <div className='md:flex items-center gap-8'>
                <div>
                    <h2 className="text-4xl font-semibold">Join the Excitement at Sports Academies!</h2>
                    <p>Discover the thrilling lineup of upcoming events at Sports Academies! We are passionate about providing our students with opportunities to showcase their skills, compete, and grow as athletes. Mark your calendars and get ready for an action-packed schedule of sports tournaments, workshops, and special events.</p>
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