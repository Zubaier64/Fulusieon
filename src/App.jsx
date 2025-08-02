import { useState, useEffect } from 'react';
import './main.css';

export default function App() {
  // State variables (converted from your JS vars)
  const [playerName] = useState('MoZubair');
  const [money, setMoney] = useState(1000);
  const [tax, setTax] = useState(0);
  const [evade, setEvade] = useState(0);
  const [residents, setResidents] = useState(5);
  const [rent, setRent] = useState(10);
  const [hotelUpgradeLevel, setHotelUpgradeLevel] = useState(1);
  const [hotelExpandLevel, setHotelExpandLevel] = useState(1);
  const [upgradeCost, setUpgradeCost] = useState(500);
  const [expandCost, setExpandCost] = useState(1000);
  const [month, setMonth] = useState(1);
  const [betAmount, setBetAmount] = useState('');

  // Sounds
  const sClick = new Audio('/sound/click.mp3');

  // Check win condition
  useEffect(() => {
    if (money >= 100000 && tax === 0) {
      alert('You Win!');
      window.location.reload();
    }
  }, [money, tax]);

  // Handlers
  const nextMonth = () => {
    sClick.play();
    const newMoney = money + residents * rent;
    setMoney(newMoney);

    const newMonth = month + 1;
    setMonth(newMonth);

    const newTax = tax + Math.ceil(residents * rent * 0.1 * (1 + 0.5 * evade));
    if (newTax > newMoney) {
      alert('Over tax evading (L)');
      window.location.reload();
    } else {
      setTax(newTax);
      setEvade(evade + 1);
    }
  };

  const payTax = () => {
    sClick.play();
    setMoney(money - tax);
    setTax(0);
    setEvade(0);
  };

  const upgradeHotel = () => {
    sClick.play();
    if (money < upgradeCost) {
      alert('Not enough money');
      return;
    }
    setMoney(money - upgradeCost);
    setRent(rent + Math.ceil(1 + hotelUpgradeLevel * 1.5));
    setHotelUpgradeLevel(hotelUpgradeLevel + 1);
    setUpgradeCost(Math.ceil(upgradeCost * (1 + 0.15 * hotelExpandLevel)));
    alert(`Upgrade done! Hotel upgrade level: ${hotelUpgradeLevel + 1}`);
  };

  const expandHotel = () => {
    sClick.play();
    if (money < expandCost) {
      alert('Not enough money');
      return;
    }
    setMoney(money - expandCost);
    setResidents(residents + Math.floor(1 + hotelExpandLevel * 0.5));
    const newExpandLevel = hotelExpandLevel + 1;
    setHotelExpandLevel(newExpandLevel);
    setExpandCost(Math.ceil(expandCost * (1 + 0.15 * newExpandLevel)));
    alert(`Expand done! Hotel expand level: ${newExpandLevel}`);
  };

  const placeBet = () => {
    sClick.play();
    const betMoney = Number(betAmount);
    if (!betMoney || betMoney > money) {
      alert('Not enough money or invalid bet');
      return;
    }

    const chance = Math.floor(Math.random() * 100) + 1;
    if (chance < 50) {
      setMoney(money - betMoney);
      alert(`You've lost $${betMoney}`);
    } else if (chance > 50) {
      setMoney(money + betMoney * 2);
      alert(`You've won $${betMoney * 2}`);
    } else {
      setMoney(money + betMoney * 5);
      alert(`Jackpot! You've won $${betMoney * 5}`);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="left-col">
            <a className="logo" href="index.html">
              fulus<span>ieon</span>
            </a>
          </div>
          <div className="mid-col">
            <p className="date" id="date">
              {month} month(s)
            </p>
          </div>
          <div className="right-col">
            <button
              type="button"
              className="button NMButton"
              id="next-month"
              onClick={nextMonth}
            >
              Next Month
            </button>
          </div>
        </div>
      </div>

      <section className="pfp-section">
        <div className="container">
          <div className="left-col">
            <img id="pfp" className="pfp" src="/res/pfp.JPG" alt="pfp" />
          </div>
          <div className="right-col">
            <p className="name" id="name">
              {playerName} (collect 100K)
            </p>
            <p className="money" id="money">
              ${money}
            </p>
          </div>
        </div>
      </section>

      <section className="hotel-section">
        <div className="container">
          <div className="left-col">
            <img id="hotel" className="hotel" src="/res/hotel.JPG" alt="hotel" />
          </div>
          <div className="mid-col">
            <p className="rent" id="rent">
              ${rent}/month
            </p>
            <button
              type="button"
              className="button upgradeB"
              id="upgrade"
              onClick={upgradeHotel}
            >
              Upgrade: ${upgradeCost}
            </button>
          </div>
          <div className="right-col">
            <p className="residents" id="residents">
              {residents} residents
            </p>
            <button
              type="button"
              className="button expandB"
              id="expand"
              onClick={expandHotel}
            >
              Expand: ${expandCost}
            </button>
          </div>
        </div>
      </section>

      <section className="casino-section">
        <div className="container">
          <div className="left-col">
            <img id="casino" className="casino" src="/res/casino.JPG" alt="casino" />
          </div>
          <div className="right-col">
            <label htmlFor="bet-input" id="bet-amount">
              Bet amount (50/50 chance):
            </label>
            <br />
            <input
              type="number"
              id="bet-input"
              name="bet-amount"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
            />
            <br />
            <button
              type="button"
              className="button betB"
              id="bet"
              onClick={placeBet}
            >
              Bet
            </button>
          </div>
        </div>
      </section>

      <section className="investor-section">
        <div className="container">
          <div className="left-col">
            <img id="investor" className="investor" src="/res/investor.JPG" alt="investor" />
          </div>
          <div className="right-col">
            <p className="offer-describe" id="offer-describe">
              offer describe
            </p>
            <button type="button" className="button nOfferB">
              Next Offer
            </button>
            <button type="button" className="button investB">
              Invest
            </button>
          </div>
        </div>
      </section>

      <section className="taxes-section">
        <div className="container">
          <div className="left-col">
            <img id="taxes" className="taxes" src="/res/taxes.JPG" alt="taxes" />
          </div>
          <div className="right-col">
            <p className="tax-amount" id="tax-amount">
              ${tax} tax
            </p>
            <button
              type="button"
              className="button payB"
              id="pay"
              onClick={payTax}
            >
              Pay
            </button>
          </div>
        </div>
      </section>

      <section className="maintaince-section">
        <div className="container">
          <div className="left-col">
            <img
              id="maintaince"
              className="maintaince"
              src="/res/maintaince.JPG"
              alt="maintaince"
            />
          </div>
          <div className="right-col">
            <p className="offer-describe" id="offer-describe">
              maintaince describe
            </p>
            <button type="button" className="button maintainceB">
              Maintaine
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
