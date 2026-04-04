import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function SuggestedPeople() {
    const [peoples, setPeoples] = useState(() => [
        { name: 'Steve Jobs', title: 'CEO of Apple', avater: 'people1.png' },
        { name: 'Ryan Roslansky', title: 'CEO of Linkedin', avater: 'people2.png' },
        { name: 'Dylan Field', title: 'CEO of Figma', avater: 'people3.png' },
    ])

    return (
        <div className="_left_inner_area_suggest _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
            <div className="_left_inner_area_suggest_content _mar_b24">
                <h4 className="_left_inner_area_suggest_content_title _title5">
                    Suggested People
                </h4>
                <span className="_left_inner_area_suggest_content_txt">
                    <Link to="/peoples" className="_left_inner_area_suggest_content_txt_link">
                        See All
                    </Link>
                </span>
            </div>
            {[...peoples].map(({ name, title, avater, url = '#' }, i) => (
                <div key={i} className="_left_inner_area_suggest_info">
                    <div className="_left_inner_area_suggest_info_box">
                        <div className="_left_inner_area_suggest_info_image">
                            <Link to={url}>
                                <img
                                    src={`assets/images/${avater}`}
                                    alt={`${name} avater`}
                                    className="_info_img"
                                />
                            </Link>
                        </div>
                        <div className="_left_inner_area_suggest_info_txt">
                            <Link to={url}>
                                <h4 className="_left_inner_area_suggest_info_title">
                                    {name}
                                </h4>
                            </Link>
                            <p className="_left_inner_area_suggest_info_para">{title}</p>
                        </div>
                    </div>
                    <div className="_left_inner_area_suggest_info_link">
                        {" "}
                        <Link to="#0" className="_info_link">
                            Connect
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}