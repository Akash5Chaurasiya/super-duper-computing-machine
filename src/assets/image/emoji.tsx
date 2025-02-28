import React from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';

export interface RISVGImage {}

export default function SVGImage(props: RISVGImage) {
    const {} = props;

    return (
        <Svg width={2048} height={2048} viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
            <Rect width={2048} height={2048} className="fil0" />
            <Rect x="256" y="256" width="1536" height="1536" className="fil0" />
            <Rect width="2048" height="2048" className="fil0" />
            <Rect x="256" y="256" width="1536" height="1536" className="fil0" />
            <Rect width="2048" height="2048" className="fil0" />
            <Rect x="256" y="256" width="1536" height="1536" className="fil0" />
            <G id="Layer_x0020_1">
                <Path
                    className="fil1"
                    d="M1023.79 547.619c331.451,0 600.143,268.694 600.143,600.145 0,331.451 -268.693,600.143 -600.143,600.143 -331.451,0 -600.143,-268.693 -600.143,-600.143 0,-331.451 268.693,-600.145 600.143,-600.145z"
                />
                <G>
                    <Path
                        className="fil2"
                        d="M1223.82 872.696c34.526,0 62.5146,27.9898 62.5146,62.5158 0,34.5272 -27.9886,62.5158 -62.5146,62.5158 -34.5272,0 -62.5158,-27.9886 -62.5158,-62.5158 0,-34.526 27.9886,-62.5158 62.5158,-62.5158z"
                    />
                    <Path
                        className="fil2"
                        d="M823.759 872.696c-34.5272,0 -62.5158,27.9898 -62.5158,62.5158 0,34.5272 27.9886,62.5158 62.5158,62.5158 34.5272,0 62.5158,-27.9886 62.5158,-62.5158 0,-34.526 -27.9886,-62.5158 -62.5158,-62.5158z"
                    />
                </G>
                <Path
                    className="fil2"
                    d="M1346.32 1328.38c-33.2599,57.6048 -80.6245,104.154 -136.3,136.299 -55.8012,32.2181 -119.837,50.002 -186.3,50.002 -66.4619,0 -130.498,-17.7839 -186.3,-50.002 -55.676,-32.1449 -103.041,-78.6945 -136.3,-136.299l51.7902 -29.9965c27.9414,48.3933 67.7327,87.4997 114.507,114.506 46.6477,26.9315 100.367,41.7981 156.304,41.7981 55.9371,0 109.657,-14.8665 156.304,-41.7981 46.7741,-27.0059 86.5654,-66.1123 114.507,-114.506l51.7902 29.9965z"
                />
                <G>
                    <Path
                        className="fil3"
                        d="M310.227 955.159c26.8051,-309.966 210.092,-509.585 436.996,-599.736 99.2552,-39.4359 206.809,-57.7654 313.123,-55.0713 106.592,2.70118 212.046,26.4591 306.788,71.1886 207.682,98.0481 364.191,295.852 370.236,592.435l-61.1256 1.19764c-5.5004,-269.844 -147.21,-449.49 -335.238,-538.261 -87.0827,-41.1118 -184.049,-62.9504 -282.098,-65.4355 -98.328,-2.49095 -197.653,14.4024 -289.153,50.7567 -206.792,82.1611 -373.875,264.567 -398.403,548.198l-61.1256 -5.27363z"
                    />
                    <Path
                        className="fil4"
                        d="M1706.86 932.741c30.8941,0 54.7548,30.9933 68.3528,81.0981 10.3701,38.2111 16.7847,90.4642 16.7847,147.696 0,57.2304 -6.41457,109.485 -16.7847,147.695 -13.598,50.1059 -37.4587,81.0993 -68.3528,81.0993 -30.8953,0 -54.7548,-30.9933 -68.354,-81.1005 -10.3689,-38.2099 -16.7847,-90.4631 -16.7847,-147.693 0,-57.2315 6.41575,-109.484 16.7847,-147.695 13.5992,-50.1059 37.4587,-81.0993 -68.354,-81.0993z"
                    />
                    <Path
                        className="fil4"
                        d="M341.139 932.741c30.8918,0 54.7536,30.9933 68.3528,81.0993 10.3689,38.2111 16.7847,90.4631 16.7847,147.695 0,57.2304 -6.41575,109.484 -16.7847,147.693 -13.5992,50.1071 -37.4611,81.1005 -68.3528,81.1005 -30.8965,0 -54.7559,-30.9933 -68.354,-81.1005 -10.3701,-38.2099 -16.7847,-90.4631 -16.7847,-147.693 0,-57.2315 6.41457,-109.484 16.7847,-147.695 13.598,-50.1059 37.4575,-81.0993 68.354,-81.0993z"
                    />
                </G>
            </G>
        </Svg>
    );
}
