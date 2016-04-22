import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { clickArtboardLayer, enterArtboardLayer, leaveArtboardLayer, scaleArtboard, takeArtboard, dropArtboard, dragArtboard } from '../actions'
import { getArtboards, getActiveArtboard, getImage} from '../reducers/artboard'
import { getScale, getDragging, getIsDragging } from '../reducers/control'
import ArtboardComponent from '../components/ArtboardComponent'
import ArtboardLayerItem from '../components/ArtboardLayerItem'

//onMouseDown={this.props.takeArtboard}
//onMouseUp={this.props.dropArtboard}
//onMouseMove={this.props.dragArtboard}

class Artboard extends Component {
    render() {
        const { activeArtboard } = this.props
        return (
            <ArtboardComponent
                name={decodeURIComponent(activeArtboard.name)}
                image={this.props.image}
                left={activeArtboard.x}
                top={activeArtboard.y}
                width={activeArtboard.width}
                height={activeArtboard.height}
                zIndex={activeArtboard.zIndex}
                scale={this.props.scale}
                dragging={this.props.dragging}
                isDragging={this.props.isDragging}
                scaleArtboard={this.props.scaleArtboard}
                takeArtboard={this.props.takeArtboard}
                dropArtboard={this.props.dropArtboard}
                dragArtboard={(event) => this.props.isDragging && this.props.dragArtboard(event)}
            >
                {activeArtboard.layer.map(layer =>
                        <ArtboardLayerItem
                            key={layer.id}
                            layer={layer}
                            onClickArtboardLayer={() => this.props.clickArtboardLayer(layer)}
                            onEnterArtboardLayer={() => this.props.enterArtboardLayer(layer)}
                            onLeaveArtboardLayer={() => this.props.leaveArtboardLayer(layer)}
                        />
                )}
            </ArtboardComponent>
        )
    }
}

Artboard.propTypes = {
    artboards: PropTypes.object,
    activeArtboard: PropTypes.object,
    image: PropTypes.string,

    scale: PropTypes.number,
    dragging: PropTypes.object,
    isDragging: PropTypes.bool,

    scaleArtboard: PropTypes.func.isRequired,
    takeArtboard: PropTypes.func.isRequired,
    dropArtboard: PropTypes.func.isRequired,
    dragArtboard: PropTypes.func.isRequired,

    clickArtboardLayer: PropTypes.func.isRequired,
    enterArtboardLayer: PropTypes.func.isRequired,
    leaveArtboardLayer: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        artboards: getArtboards(state.artboard),
        activeArtboard: getActiveArtboard(state.artboard),
        image: getImage(state.artboard),
        scale: getScale(state.control),
        dragging: getDragging(state.control),
        isDragging: getIsDragging(state.control)//,
        //backgroundColor: getBackgroundColor(state.setting)
    }
}

export default connect(
    mapStateToProps,
    { clickArtboardLayer, enterArtboardLayer, leaveArtboardLayer, scaleArtboard, takeArtboard, dropArtboard, dragArtboard }
)(Artboard)