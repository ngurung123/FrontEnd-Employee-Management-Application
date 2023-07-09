import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <nav class="navbar navbar-light bg-primary">
                <div class="container text-center">
                    <a class="navbar-brand mx-auto" href="#">All rights reserved 2023@ReactJsTest</a>
                </div>
            </nav>
        );
    }
}

export default FooterComponent;