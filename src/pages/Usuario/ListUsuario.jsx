
const columnsTable = [
  // {
  //   title: 'Código',
  //   dataIndex: 'codigo',
  //   key: 'codigo',
  // },
  {
    title: 'Usuario',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
  },
  {
    title: 'Primer Apellido',
    dataIndex: 'primerApellido',
    key: 'primerApellido',
    responsive: ['md'],
  },
  // {
  //   title: 'Segundo Apellido',
  //   dataIndex: 'segundoApellido',
  //   key: 'segundoApellido',
  // },
  // {
  //   title: 'Dirección',
  //   dataIndex: 'direccion',
  //   key: 'direccion',
  // },

  // {
  //   title: 'celular ',
  //   dataIndex: 'celular',
  //   key: 'celular',
  // },
  {
    title: 'interno',
    dataIndex: 'interno',
    key: 'interno',
    responsive: ['md'],
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
    responsive: ['md'],
  },
  {
    title: 'Rol de Usuario',
    dataIndex: 'rolUsuario',
    key: 'rolUsuario',
    responsive: ['md'],
    render: (_, record) => (
      <>
        {record.roleList.map((role, index) => <p key={'rol-' + index} >{role.nameRole}</p>)}
      </>
    )
  },
];

export default columnsTable