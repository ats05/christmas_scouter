import React, {Component} from 'react';
import styled from 'styled-components';

export default class Main extends Component {
    constructor(props) {
        super(props);

        let width = window.parent.screen.width;
        let height = window.parent.screen.height;

        this.state = {
            nowInPlay: true,
            width: width,
            height: height
        }

    }
    componentDidMount() {
        console.log(this.refs.videoElement);
        this.videoElement = this.refs.videoElement
        // this.videoElement.setAttribute('playsinline', true);
        // this.videoElement.setAttribute('width', width);
        // this.videoElement.setAttribute('height', height);

        navigator.mediaDevices.getUserMedia({
            video: {
                width: this.state.width,
                height: this.state.height,
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
    render() {
        return (
            <video ref="videoElement" width={this.state.width} height={this.state.height} playsInline/>
        );
    }
}
