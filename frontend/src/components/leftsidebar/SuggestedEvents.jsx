import { useState } from 'react';
import { Link } from 'react-router-dom';

const monthsNames = ['Jan', 'Feb', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Act', 'Nov', 'Dec'];

export default function SuggestedEvents() {
    const [events, setEvents] = useState(() => [
        { title: 'No more terrorism no more cry', banner: 'feed_event1.png', date: 1815156000, message: '17 People Going' },
        { title: 'No more terrorism no more cry', banner: 'feed_event1.png', date: 1815156000, message: '17 People Going' },
    ]);

    return (

        <div className="_left_inner_area_event _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
            <div className="_left_inner_event_content">
                <h4 className="_left_inner_event_title _title5">Events</h4>
                <Link to="/events" className="_left_inner_event_link">
                    See all
                </Link>
            </div>
            {[...events].map(({ title, banner, date, message }, i) => (
                <div key={i} className="_left_inner_event_card">
                    <Link to="event-single.html" className="_left_inner_event_card_link">
                        <div className="_left_inner_event_card_iamge">
                            <img
                                src={`assets/images/${banner}`}
                                className="_card_img"
                                alt={title}
                            />
                        </div>
                        <div className="_left_inner_event_card_content">
                            <div className="_left_inner_card_date">
                                <p className="_left_inner_card_date_para">{new Date(date * 1000).getDate()}</p>
                                <p className="_left_inner_card_date_para1">{monthsNames[new Date(date * 1000).getMonth()]}</p>
                            </div>
                            <div className="_left_inner_card_txt">
                                <h4 className="_left_inner_event_card_title">
                                    {title}
                                </h4>
                            </div>
                        </div>
                        <hr className="_underline" />
                    </Link>
                    <div className="_left_inner_event_bottom">
                        <Link to="event-single.html" className="_left_inner_event_card_link">
                            <p className="_left_iner_event_bottom">{message}</p>{" "}
                        </Link>
                        <button type="button" className="_left_iner_event_bottom_link">
                            Going
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}