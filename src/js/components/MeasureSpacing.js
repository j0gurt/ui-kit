import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { isColorLight } from '../utils/UIColors';

export default class MeasureMarker extends Component {
    render() {
        const { scale, color, spacing } = this.props;

        const spacingList = spacing.map((rulerItem) => {
            const rulerStyle = {
                left: rulerItem.left * scale + 'px',
                top: rulerItem.top * scale + 'px',
                height: rulerItem.height ? rulerItem.height * scale + 'px' : 0,
                width: rulerItem.width ? rulerItem.width * scale + 'px' : 0,
                borderColor: color,
            };

            return (
                <div className={classnames({
                    'measure-ruler': true,
                    'measure-ruler_top': rulerItem.type === 'top',
                    'measure-ruler_bottom': rulerItem.type === 'bottom',
                    'measure-ruler_left': rulerItem.type === 'left',
                    'measure-ruler_right': rulerItem.type === 'right',
                })} style={rulerStyle}
                >
                    <span className="measure-ruler__label">
                        <span className={classnames({
                            'measure-ruler__value': true,
                            'measure-ruler__value_text_dark': isColorLight(color),
                        })} style={{ backgroundColor: color }}
                        >
                            {rulerItem.value}
                        </span>
                    </span>
                </div>
            );
        });

        return (
            <div classNmae="measure-ruler">
                {spacingList}
            </div>
        );
    }
}

MeasureMarker.propTypes = {
    scale: PropTypes.number,
    spacing: PropTypes.array,
    color: PropTypes.string,
};
