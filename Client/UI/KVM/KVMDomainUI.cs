using Keyroll.KVM;
using System.Windows.Forms;

namespace Keyroll
{
    public partial class KVMDomainUI : UserControl
    {
        private Domain _Model = null;

        public Domain Model 
        {
            get { return _Model; }
            set 
            {
                _Model = value;
                if (_Model != null)
                    LoadModel();
            }
        }

        public KVMDomainUI()
        {
            InitializeComponent();
        }

        private void LoadModel()
        {
            TxtName.InputText = _Model.Name;
        }

        private void BtnUpdate_Click(object sender, System.EventArgs e)
        {
            _Model.Name = TxtName.InputText;
        }
    }
}
