import React from 'react'

function ArtPictureForm({ inputProps, active, editedArt }) {
    return (
        <form className={active ? "show" : ""}>
            {editedArt &&
                <input
                    {...inputProps}
                    autoFocus
                    required
                    id='title'
                    className='input'
                    type="text"
                    placeholder="Title"
                    name="title" 
                    defaultValue= {editedArt.title}
                    />

                    }

            <input
                {...inputProps}
                required
                id="link"
                className="input"
                type="text"
                placeholder="Image link"
                name="link"
                defaultValue= {editedArt?.image}
            />
            <textarea
                {...inputProps}
                maxLength="840"
                id="description"
                className="input"
                type="text"
                placeholder="Description"
                name="description"
                defaultValue= {editedArt?.description}
            ></textarea>

            <div className="flex">
                <>
                    <input
                        {...inputProps}
                        required
                        id="artist"
                        className="input"
                        type="text"
                        placeholder="Artist name"
                        name="artist"
                        defaultValue= {editedArt?.artist?.name}
                    />
                </>
                <div>
                    <input
                        {...inputProps}
                        required
                        id="year"
                        className="input"
                        type="text"
                        placeholder="Year"
                        name="year"
                        defaultValue= {editedArt?.year}
                    />
                </div>
            </div>

            <input
                {...inputProps}
                id="artistlink"
                className="input"
                type="text"
                placeholder="Artist image link (optional)"
                name="artistlink"
                defaultValue= {editedArt?.artist?.image}
            />

            <input
                {...inputProps}
                id="source"
                className="input"
                type="text"
                placeholder="Source link (wiki)"
                name="wiki"
                defaultValue= {editedArt?.source}
            />
        </form>
    )
}

export default ArtPictureForm