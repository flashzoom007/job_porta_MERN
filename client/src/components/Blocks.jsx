import { useEffect, useState, useRef } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Blocks = () => {
    const [Api, setApi] = useState([]);
    useEffect(() => {
        setApi(
            [
                {
                    "id": 1,
                    "category": "Food",
                    "title": "Raclette Blueberry Nextious Level",
                    "description": "Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat."
                },
                {
                    "id": 2,
                    "category": "Travel",
                    "title": "Exploring the Hidden Gems of Europe",
                    "description": "Pack your bags and set off on a journey through the charming streets of Europe’s most underrated cities."
                },
                {
                    "id": 3,
                    "category": "Technology",
                    "title": "The Future of AI and Automation",
                    "description": "Artificial intelligence is reshaping industries, from healthcare to finance, with smarter automation."
                }
            ]
        )
    })
    // useGSAP(() => {
    //     gsap.from("#block-inner-section", {
    //         y: -200,
    //         opacity: 0,
    //         delay: 1,
    //         duraction: 2,
    //     })
    // })
    return (
        <>
            <div className='block-section container'>
                {Api.map((props) => {
                    const { id, title, description, category } = props;
                    return (
                        <div key={id} className="block-inner-section" id="block-inner-section">
                            <p className='sub-heading' id="heading">{category}</p>
                            <h2>{title}</h2>
                            <p>{description}</p>
                            <button className="btn btn-outline-dark">Learn More <FaChevronRight /></button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Blocks