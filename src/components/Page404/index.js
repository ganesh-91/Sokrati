import React, { Component } from "react";
// import { Jumbotron,Button } from "react-bootstrap";

class Page404 extends Component {
    render() {
        return (
          <div>
          <div className="jumbotron">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="clearfix">
                    <h1 className="float-left display-3 mr-4">404</h1>
                    <h4 className="pt-3">Oops! You're lost.</h4>
                    <p className="text-muted">The page you are looking for was not found.</p>
                    <button onClick={this.backClick} >Go back</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        );
    }
}
export default Page404;