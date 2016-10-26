import LoadingIndicator from 'ui/components/LoadingIndicator';
import React from 'react';
import { connect } from 'react-redux';

const LOADER_ANIM_TIME = 700;
const LOADER_DELAY = 300;

class UI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingLoader: false
    };
  }

  componentWillReceiveProps(nextProps) {
    let isCurrentlyLoading = this.props.isLoading;

    if (!isCurrentlyLoading && nextProps.isLoading) {
      this._scheduleShowingLoader();
    } else if (isCurrentlyLoading && !nextProps.isLoading) {
      this._cancelShowingLoader();
    }
  }

  _cancelShowingLoader() {
    if (this._loaderDelayTimer) {
      clearTimeout(this._loaderDelayTimer);
    } else if (!this._loaderAnimationTimer) {
      this._hideLoader();
    }
  }

  _hideLoader() {
    this.setState({isShowingLoader: false});
  }

  _scheduleShowingLoader() {
    this._loaderDelayTimer = setTimeout(() => {
      this._loaderDelayTimer = null;
      this._showLoader();
    }, LOADER_DELAY);
  }

  _showLoader() {
    this.setState({isShowingLoader: true});
    this._loaderAnimationTimer = setTimeout(() => {
      this._loaderAnimationTimer = null;
      if (!this.props.isLoading) {
        this._hideLoader();
      }
    }, LOADER_ANIM_TIME);
  }

  render() {
    let { children } = this.props;
    let { isShowingLoader } = this.state;

    return (
      <div className="ui-shell">
        {children}
        <LoadingIndicator isVisible={isShowingLoader}/>
      </div>
    );
  }
}

export default connect(
  (state) => ({isLoading: state.ui.isLoading})
)(UI);
