import React, {Component} from 'react';
import styled from 'styled-components';
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import Score from './score';

export default class Main extends Component {
    constructor(props) {
        super(props);

        let width = window.parent.screen.width;
        let height = window.parent.screen.height;


        this.state = {
            nowInPlay: true,
            width: width,
            height: height,
            model: null,
            score: "--.-",
        }

        // 変換したモデルを読み込む
        tf.loadGraphModel('./assets/web_model/model.json').then((model) => {
            this.setState({model: model})
            this.animate();
        })

        this.animate = this.animate.bind(this);

    }
    componentDidMount() {
        this.videoElement = this.refs.videoElement
        navigator.mediaDevices.getUserMedia({
            video: {
                aspectRatio: this.state.width / this.state.height, // アスペクト比
                facingMode:  "environment" // バックカメラを使う指定
            },
            audio: false
        }).then((stream) => {
            this.videoElement.srcObject = stream;
            this.videoElement.play();
        })
        .catch(function(err) {
            // カメラが読み込めなかった時の処理をなんか入れる
            console.log(err);
        });
    }
    animate() {
        if (this.state.model !== null) {
            let tensor = tf.tidy(() => {
                const channels = 3;
                let inputImage = tf.browser.fromPixels(this.videoElement, 3);
                let float_caster = tf.cast(inputImage, 'float32');
                let dims_expander = float_caster.expandDims(0);
                let resized = tf.image.resizeBilinear(dims_expander, [299, 299]);
                let normalized = tf.div(tf.sub(resized, [0]), [255]);
                return normalized;
            })
            new Promise((resolve, reject) => {
                let result = this.state.model.predict(tensor).array(); // 値はarray()で取り出せる
                resolve(result);
            }).then(result => {
                this.setState({score: Math.round(result[0][0] * 1000) / 10});
                this.animate(); // 計算が終わってから次の処理が走るようにする
            });
        }
        else {
            this.animate();
        }
    }
    render() {
        return (
            <div>
                <Video ref="videoElement" width={this.state.width} height={this.state.height} playsInline/>
                <Score score={this.state.score} />
            </div>
        );
    }
}

const Video = styled.video`
width: 100%;
max-width: 100%;
height: 100%;
object-fit: fill;
display: block;
margin: 0 auto;
`
