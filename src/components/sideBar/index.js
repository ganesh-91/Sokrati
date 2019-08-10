import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './index.scss';

class SideBar extends Component {
    render() {
        return (
            <div className="side-bar">
                <div className="btn-group-vertical w-100" role="group">
                    <button type="button" className="btn btn-warning btn-block rounded-0 pl-1 pr-1 pb-4 pt-4">
                        <Link to="/recipe-list">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <br/>
                            <small>Recipe</small>
                        </Link>
                    </button>
                    <button type="button" className="btn btn-light btn-block rounded-0 pl-1 pr-1 text-center pb-3 pt-3 border-bottom">
                        <Link to="/grocery-list">
                            <i className="fa fa-list-alt" aria-hidden="true"></i>
                            <br/>
                            <small>Grocery</small>
                        </Link>
                    </button>
                </div>
            </div>
        );
    }
}
export default SideBar;