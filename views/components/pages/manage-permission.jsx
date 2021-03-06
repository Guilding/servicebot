import React from 'react';
import {browserHistory} from 'react-router';
import {Authorizer, isAuthorized} from "../utilities/authorizer.jsx";
import Jumbotron from "../layouts/jumbotron.jsx";
import Content from "../layouts/content.jsx";
import ManagePermissionForm from '../elements/forms/manage-permission-form.jsx';

class ManagePermission extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(!isAuthorized({permissions: ["can_administrate", "can_manage"]})){
            return browserHistory.push("/login");
        }

    }

    render () {
        let pageName = this.props.route.name;

        if(isAuthorized({permissions: ["can_administrate"]})){
            return(
                <div className="page-service-instance">
                    <Jumbotron pageName={pageName} location={this.props.location}/>
                    <Content>
                        <div className="row m-b-20">
                            <ManagePermissionForm />
                        </div>
                    </Content>
                </div>
            );
        }else if(isAuthorized({permissions: ["can_manage"]})){
            return(
                <div className="page-service-instance">
                    <Jumbotron pageName={pageName} location={this.props.location}/>
                    <Content>
                        <div className="row m-b-20">
                            <p>This feature is turned off for this demo.</p>
                        </div>
                    </Content>
                </div>
            );
        }else{
            return(
                <div className="page-service-instance">
                    <Jumbotron pageName={pageName} location={this.props.location}/>
                    <Content>
                        <div className="row m-b-20">
                            <p>Unauthorized</p>
                        </div>
                    </Content>
                </div>
            )
        }
    }
}

export default ManagePermission;
