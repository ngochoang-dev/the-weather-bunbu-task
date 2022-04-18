import React, { useState } from 'react';
import clsx from 'clsx';
import Iframe from 'react-iframe';

import styles from './Radar.module.css';

const mapWeather = [
    {
        id: 1,
        image: 'radar.jpg',
        title: 'Radar',
        type: 'radar',
    },
    {
        id: 2,
        image: 'clouds.jpg',
        title: 'Clouds',
        type: 'sat',
    }
]

function Radar() {
    const [isActive, setIsActive] = useState(1);
    const [type, setType] = useState('radar');

    return (
        <div className={clsx(
            styles.container
        )}>
            <Iframe url={`https://www.rainviewer.com/map.html?loc=21.0025,105.794,5&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=1&c=3&o=83&lm=1&layer=${type}&sm=1&sn=1`}
                width="100%"
                height="100%"
                className="radar"
                display="initial"
                position="relative"
                frameBorder={0}
                allowFullScreen={true}
            />
            <div className={clsx(
                styles.wrapper_menu
            )}>
                {
                    mapWeather.map(({ image, title, id, type }, i) => {
                        return (
                            <div
                                key={i}
                                className={clsx(
                                    styles.btn_menu
                                )}
                                data-testid={`btnMenu-${id}`}
                                onClick={() => {
                                    setType(type)
                                    setIsActive(id)
                                }}
                            >
                                <div
                                    style={{ backgroundImage: `url('./${image}')` }}
                                    className={clsx(
                                        styles.images,
                                        isActive === id && styles.active
                                    )}></div>
                                <span
                                    className={clsx(
                                        isActive === id && styles.active_tile
                                    )}
                                >{title}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Radar;
