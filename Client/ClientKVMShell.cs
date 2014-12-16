using Keyroll.KVM;
using Keyroll.Shell;
using Sartrey.UI.WinForms;

namespace Keyroll
{
    public class ClientKVMShell : KVMShell
    {
        public override void Shell(object model)
        {
            var ui = new KVMMainUI();
            ui.Model = model as Memory;
            var window = new Window(ui);
            window.Show();
        }
    }
}
