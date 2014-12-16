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
            set { _Model = value; }
        }

        public KVMRecordUI()
        {
            InitializeComponent();
        }
    }
}
