import React from 'react';
import { CircularProgress } from 'material-ui';

export default class Preloader extends React.Component {
    render() {
        return (
            <div className='preloader'>
                <CircularProgress size={150} thickness={8} />
            </div>
        );
    }
}