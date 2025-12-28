const SectionHeader = ({ title, colSpan }) => {
  return (
    <tr>
      <th></th>
      <td
        colSpan={colSpan}
        style={{ backgroundColor: '#212529', color: '#F5F5F5' }}
      >
        {title}
      </td>
    </tr>
  );
};

export default SectionHeader;
