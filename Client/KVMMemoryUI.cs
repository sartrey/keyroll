using Keyroll.KVM;
using System.Windows.Forms;

namespace Keyroll
{
    public partial class KVMMemoryUI : UserControl
    {
        private Memory _Model = null;

        public Memory Model 
        {
            get { return _Model; }
            set { _Model = value; }
        }

        public KVMMemoryUI()
        {
            InitializeComponent();
        }
    }
}
