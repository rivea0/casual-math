export default function Text() {
    return (
        <form action="">
            <div className="text">
                <label htmlFor="equation"></label>
                    <input
                        type="text"
                        placeholder="Type equation..."
                        name="equation"
                        className="text-input"
                        id="equation"
                    />
            </div>
        </form>
    )
}