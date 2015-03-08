Component.driveRow = React.createClass({
  render: function() {
    return (<div id={this.props.drive.key_drive_map} className="driveRow">
      <div className={"mapped" + (this.props.drive.map?' yes':' no')}>{this.props.drive.map?'Y':'-'}</div>
      <div className="letter">{this.props.drive.drive_letter}</div>
      <div className="machine">{this.props.drive.machine}</div>
      <div className="share">{this.props.drive.share}</div>
      <div className="shareLabel">{this.props.drive.share_label}</div>
</div>);
  }
});
Component.facility = React.createClass({
  render: function() {
    var rows = _.map(this.props.facility, function(drive) {
      return (
        <Component.driveRow drive={drive} />
      );
    })
    return (
      <div className="facility">
        <div className="facilityHeader">
          {this.props.facility[0].sg_facility}
        </div>
        <div className="drives">{rows}</div>
      </div>
    );
  }
});
Component.facilities = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    $.ajax({
      url: "/driveMap/maps",
      dataType: 'json',
      success: function(data) {
        data = _.sortBy(data, function(d) {
          return sprintf('%-15s %-2s %s', d.sg_facility, d.drive_letter, d.machine);
        });
        data = _.groupBy(data, function(r) {
          return r.key_facility;
        });
        this.setState({
          facilities: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        // this.loadFromServer();
      }.bind(this)
    });
  },
  render: function() {
    var rows = _.map(this.state.facilities, function(facility) {
      return (
        <Component.facility facility={facility} />
      );
    }.bind(this));
    return (
      <div>{rows}</div>
    );
  }
});
React.render(
  <Component.facilities />,
  document.getElementById('content')
);