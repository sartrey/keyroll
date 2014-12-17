using Keyroll.KVM;
using System.Windows.Forms;

namespace Keyroll
{
    public partial class KVMRecordUI : UserControl
    {
        private Record _Model;

        public Record Model 
        {
            get { return _Model; }
            set
            {
                _Model = value;
                if (_Model != null)
                    LoadModel();
            }
        }

        public KVMRecordUI()
        {
            InitializeComponent();
        }

        private void LoadModel()
        {
            TxtKey.InputText = _Model.Key;
            TxtValue.InputText = _Model.Value;
        }

        private void BtnUpdate_Click(object sender, System.EventArgs e)
        {
            _Model.Key = TxtKey.InputText;
            _Model.Value = TxtValue.InputText;
        }

        private void BtnCopy_Click(object sender, System.EventArgs e)
        {
            if (_Model.Value == null)
                return;
            Clipboard.SetText(_Model.Value, TextDataFormat.UnicodeText);
        }
    }
}
