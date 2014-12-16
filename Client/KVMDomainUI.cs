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
            set { _Model = value; }
        }

        public KVMDomainUI()
        {
            InitializeComponent();
        }
    }
}
