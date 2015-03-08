Component.driveRow = React.createClass({
  render: function() {
    return (<div id={this.props.drive.key_drive_map} className="driveRow">
      <div className="letter">{this.props.drive.drive_letter}</div>
      <div className="machine">{this.props.drive.machine}</div>
      <div className="share">{this.props.drive.share}</div>
      <div className="shareLabel">{this.props.drive.share_label}</div>
</div>);
  }
});
Component.facility = React.createClass({
  render: function() {
    console.log('f', this.props.facility);
    var rows = _.map(this.props.facility, function(drive) {
      return (
        <Component.driveRow drive={drive} />
      );
    })
    return (
      <div className="facility">
        <div className="facilityHeader">
          Name:{this.props.facility[0].sg_facility}
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
        // var example = {
        //   _id: "bf0ce4905ba24f83b89665d30e6d29f2"
        //   drive_letter: "y"
        //   esc_share: "f#clients"
        //   json: "{}"
        //   key_drive_map: "A3E287D8-945D-415C-B06B-364C826622A5"
        //   key_facility: "7DD266A8-C5B1-4F50-AAB7-39C5A4E19C5C"
        //   machine: "10.1.2.180"
        //   map: truename: "Los Angeles"
        //   pass: "user#435"
        //   prefix: "SP"
        //   sg_facility: "South-Pasadena"
        //   share: "f\clients"
        //   share_label: "Y - SP Client FTP site"
        //   user: "user435"
        // };
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
      <div>
        <div>Facilities</div>
        <div>{rows}</div>
      </div>
    );
  }
});
React.render(
  <Component.facilities />,
  document.getElementById('content')
);