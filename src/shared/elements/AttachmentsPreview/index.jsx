import React from 'react';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import './react-viewer.css';

export default class AttachmentsPreview extends React.Component {
    constructor() {
        super();
     
        this.state = {
          visible: false,
          activeIndex: 0
        };
      }
    render() {
        let attachmentsGallery = [];
        this.props.attachments.forEach(attachment => {
            attachmentsGallery.push({src: attachment.url, alt: attachment.label});
        });
        return (
            <div>
            {
                attachmentsGallery.map((attachment, index) => {
                    return <img 
                        onClick={() => { this.setState({ visible: !this.state.visible, activeIndex: index }); } }
                        src={attachment.src} 
                        key={index} alt={attachment.alt}/>
                })
            }
                <Viewer
                visible={this.state.visible}
                activeIndex={this.state.activeIndex}
                onClose={() => { this.setState({ visible: false }); } }
                images={attachmentsGallery}
                />
            </div>
        );
    }
} 