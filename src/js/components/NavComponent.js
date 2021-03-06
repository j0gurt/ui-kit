import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class NavPageList extends Component {
    constructor(props) {
        super(props);
        this.state = { disabled: false };
        this.toggleView = this.toggleView.bind(this);
    }

    toggleView() {
        this.setState({
            disabled: !this.state.disabled,
        });
    }

    render() {
        return (
            <nav
                className={classnames({
                    'nav': true,
                    'nav_disabled': this.state.disabled,
                })}
            >
                <div className="nav__body">
                    <ul className={classnames({
                        'nav-folder': true,
                        'nav-folder_filter': this.props.filter,
                    })}
                    >
                        {this.props.children}
                    </ul>
                    <div className="nav-footer">
                        <button
                            className={classnames({
                                'icon-list-view': true,
                                'nav-footer__btn': true,
                                'nav-footer__btn_active': this.props.viewMode === 'list',
                            })}
                            onClick={() => this.props.changeViewMode('list')}
                        >
                        </button>
                        <button
                            className={classnames({
                                'icon-project-footer': true,
                                'nav-footer__btn': true,
                                'nav-footer__btn_active': this.props.viewMode === 'tile',
                            })}
                            onClick={() => this.props.changeViewMode('tile')}
                        >
                        </button>

                        <div className="nav-footer__search">
                            <input
                                className="nav-footer__search-input"
                                type="search"
                                value={this.props.filter}
                                placeholder="SEARCH"
                                onChange={(event) => this.props.setFilter(event.target.value)}
                            />
                            <button
                                className={classnames({
                                    'nav-footer__search-btn': true,
                                    'icon-cross': this.props.filter,
                                    'icon-search': !this.props.filter,
                                })}
                                onClick={() => this.props.setFilter()}
                            >
                            </button>
                        </div>
                    </div>
                </div>
                <div className="nav-toggle">
                    <button
                        className={classnames({
                            'nav-toggle__btn': true,
                            'nav-toggle__btn_turned': !this.state.disabled,
                            'icon-chevron-left': true,
                        })}
                        onClick={this.toggleView}
                    >
                    </button>
                </div>
            </nav>
        );
    }
}

NavPageList.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    viewMode: PropTypes.string,
    filter: PropTypes.string,
    changeViewMode: PropTypes.func.isRequired,
    setFilter: PropTypes.func.isRequired,
};

export default NavPageList;
