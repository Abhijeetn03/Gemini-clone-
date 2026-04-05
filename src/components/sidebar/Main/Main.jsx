import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../../assets/assets'
import Context from '../../../context/context'

const Main = () => {
  const { onSent, recentprompts, showresults, loading, setInput, resultdata, input } = useContext(Context)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !loading) {
      event.preventDefault()
      onSent()
    }
  }

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt='User' />
      </div>
      <div className="main_container">
        {showresults ? (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User" />
              <p>{recentprompts}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini" />
              {loading ? (
                <div className="loader" aria-label="Loading response">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultdata }}></p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="greet">
              <p><span>hello, Abhijeet</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p> Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p> Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p> Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p> Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="search-box-actions">
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Microphone" />
              {input.trim() && (
                <img 
                  src={assets.send_icon}
                  alt="Send"
                  onClick={() => onSent()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="bottom-info">
        Gemini may display inaccurate info, including about people, places, or facts. Always verify critical info from reliable sources.
      </p>
    </div>
  )
}

export default Main
