const SectionAgendamento = ({ title, children }) => {
    return (
        <section className="py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{title}</h2>
            {children}
        </section>
    );
};

export default SectionAgendamento; 