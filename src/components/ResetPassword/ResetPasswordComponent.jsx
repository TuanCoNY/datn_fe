const [email, setEmail] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi yêu cầu đến backend
    fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Một mã xác thực đã được gửi tới email của bạn!');
            }
        });
};

return (
    <form onSubmit={handleSubmit}>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Nhập email"
        />
        <button type="submit">Gửi mã xác thực</button>
    </form>
);