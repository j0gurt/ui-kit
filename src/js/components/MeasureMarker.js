import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

export default class MeasureMarker extends Component {
    render() {
        const { scale, measure, type, color} = this.props

        return (
            <div className={classnames({
                   'measure_disabled': !measure.x
                })}>
                <div className={classnames('measure-marker','measure-marker_' + type)} style={{
                    left: measure.x*scale+'px',
                    top: measure.y*scale+'px',
                    width: measure.width*scale+'px',
                    height: measure.height*scale+'px',
                    boxShadow: '0 0 0 1px' + color
                }}>
                    <span className="measure-marker__value" style={{backgroundColor: color}}>{measure.width} * {measure.height}</span>
                </div>
                <div className="measure-lighthouse measure-lighthouse_top" style={{top: measure.y*scale+'px', borderColor: color}}>
                </div>
                <div className="measure-lighthouse measure-lighthouse_right" style={{left: (measure.x+measure.width)*scale+'px', borderColor: color}}>
                </div>
                <div className="measure-lighthouse measure-lighthouse_bottom" style={{top: (measure.y+measure.height)*scale+'px', borderColor: color}}>
                </div>
                <div className="measure-lighthouse measure-lighthouse_left" style={{left: measure.x*scale+'px', borderColor: color}}>
                </div>
            </div>
        )
    }
}

MeasureMarker.propTypes = {
    scale: PropTypes.number,
    measure: PropTypes.object,
    type: PropTypes.string,
    color: PropTypes.string
}
