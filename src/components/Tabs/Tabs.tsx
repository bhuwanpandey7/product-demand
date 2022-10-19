import React, { Component } from 'react'
import Addressess from './Addressess/Addressess';
import Overview from './Overview/Overview';
import Product from './Product/Product';
import "./Tabs.scss";

export default class Tabs extends Component {
    TABS: any = [
        { id: "product", name: "1 Product" },
        { id: "address", name: "2 Addresses" },
        { id: "overview", name: "3 Overview" }
    ];

    cssClass = "";

    render() {
        return (
            <>
                <div className='tabs'>
                    <ul className="nav nav-tabs mb-3" role="tablist">
                        {
                            this.TABS.map(({ id, name }: any) => {
                                return <li key={id} className="nav-item" role="presentation">
                                    <button
                                        className={name.includes('Product') ? "nav-link active" : "nav-link disabled"}
                                        id={`${name}-tab`}
                                        data-mdb-toggle="tab"
                                        data-mdb-target={`#${name}`}
                                        type="button"
                                        role="tab"
                                        aria-controls={`${name}`}
                                        aria-selected="true"
                                    >
                                        {name}
                                    </button>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className="tab-content" id="myTabContent0">
                    <div
                        className="tab-pane fade show active"
                        id="home0"
                        role="tabpanel"
                        aria-labelledby="home-tab0"
                    >
                        <Product />
                    </div>
                    <div className="tab-pane fade" id="profile0" role="tabpanel" aria-labelledby="profile-tab0">
                        <Addressess />
                    </div>
                    <div className="tab-pane fade" id="contact0" role="tabpanel" aria-labelledby="contact-tab0">
                        <Overview />
                    </div>
                </div>
            </>
        )

    }
}
