import React from 'react';
import cookie from 'react-cookie';


export default class MyOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'orders': [],
      'userPhoneNumber': cookie.load('userPhoneNumber'),
    };
  }

  get_orders() {
    $.ajax({
      url: 'http://localhost:5000/orders?where={"status": "waiting", "phone_number": "' + this.state.userPhoneNumber + '"}',
      type: 'GET',
      dataType: 'json',

      success: function(data) {
        var orders = data._items;
        this.setState({orders: orders});
        if (data._meta.total) {
          $('#orders').text(JSON.stringify(this.state.orders, null, '  '));
        }
      }.bind(this),

      error: function(data) {
        console.log(data);
      }.bind(this),
    });
  }

  componentDidMount() {
    this.get_orders();
  }


  render() {
    return (
      <div>
        <h2>我的所有历史订单</h2>
        <pre id="orders">无</pre>
      </div>
    )
  }
}
